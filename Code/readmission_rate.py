"""This file shall contain the implementation of OptiFox Readmission Rate.

More details are listed in file README.md.
"""

import pandas as pd
import pickle
import os
from dataclasses import dataclass, field
from typing import List, Optional
from flask import abort, jsonify

# Determine the root folder for relative paths
ROOT_FOLDER = os.getcwd()


@dataclass
class ReadmissionPredictionResult:
    stay_id: int
    success: bool
    probability: float
    percentage: float = field(init=False)
    message: Optional[str] = None
    feature_names: List[str] = field(default_factory=list)

    def __post_init__(self):
        # Convert probability to percentage
        self.percentage = None
        if self.probability is not None:
            self.percentage = self.probability * 100


class ReadmissionRate:
    def __init__(self, stay_id) -> None:
        self.stay_id = stay_id
        self.INPUT_DATABANK = os.path.join(
            ROOT_FOLDER, "data", "processed", "merged_df_cleaned.feather"
        )
        self.READMISSION_RATE_PICKLE = os.path.join(ROOT_FOLDER, "models", "Readmission_Model.pkl")

        # List of features used for prediction
        self.features = [
            "icu_los",
            "Glucose_max",
            "Hematocrit_max",
            "Respiratory Rate_mean",
            "Creatinine_max",
            "Sodium_min",
            "urine_last_1d",
            "Platelet Count_median",
            "Glucose_median",
            "Strength L Leg_max",
            "Magnesium_median",
            "Magnesium_max",
            "MCHC_std",
            "Potassium_min",
            "Glucose_min",
            "Anion Gap_max",
            "Respiratory Rate_std",
            "White Blood Cells_max",
            "Phosphorous_median",
            "Non Invasive Blood Pressure mean_max",
            "Alanine Aminotransferase (ALT)_median",
        ]

    def load_pickle_file(self):
        # Load the model from the pickle file
        if not os.path.exists(self.READMISSION_RATE_PICKLE):
            raise FileNotFoundError(f"Model file '{self.READMISSION_RATE_PICKLE}' not found.")
        with open(self.READMISSION_RATE_PICKLE, "rb") as pickle_file:
            model = pickle.load(pickle_file)
            return model

    def predict_readmission(self) -> ReadmissionPredictionResult:
        # Load the feature dataframe
        feature_dataframe = pd.read_feather(self.INPUT_DATABANK)

        # Check if stay_id exists in the dataframe
        if self.stay_id not in feature_dataframe["icu_stay_id"].values:
            prediction = ReadmissionPredictionResult(
                stay_id=self.stay_id,
                success=False,
                probability=None,
                message="Prediction failed as no such stay_id was found",
                feature_names=None,
            )
            return prediction

        # Filter the dataframe for the specific stay_id
        feature_dataframe = feature_dataframe[
            feature_dataframe["icu_stay_id"] == self.stay_id
        ].reset_index(drop=True)
        feature_dataframe = feature_dataframe[self.features]

        # Check if input data is empty
        if feature_dataframe.empty:
            return ReadmissionPredictionResult(
                stay_id=self.stay_id,
                success=False,
                probability=None,
                message="Prediction failed, feature dataframe is empty",
                feature_names=None,
            )

        # Perform prediction using the model
        prediction_probability = None
        error_message = "Prediction successful!"
        model = self.load_pickle_file()
        try:
            prediction_probability = model.predict_proba(feature_dataframe)[:, 1][0]
        except Exception as e:
            error_message = f"Prediction error: {str(e)}"
            return ReadmissionPredictionResult(
                stay_id=self.stay_id,
                success=False,
                probability=None,
                message=error_message,
                feature_names=self.features,
            )

        return ReadmissionPredictionResult(
            stay_id=self.stay_id,
            success=True,
            probability=prediction_probability,
            message=error_message,
            feature_names=self.features,
        )


def get_readmission_prediction(stay_id: int) -> ReadmissionPredictionResult:
    # Create an instance of ReadmissionRate
    readmission_rate = ReadmissionRate(stay_id)
    # Get the prediction result
    prediction_result = readmission_rate.predict_readmission()
    if not prediction_result:
        abort(404, message="Could not find any patient of that associated stay id")
    return jsonify(prediction_result)
