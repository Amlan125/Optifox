"""This file shall contain the implementation of OptiFox server side code.

More details are listed in file README.md.
"""

import os
import pandas as pd
from dataclasses import dataclass
from pathlib import Path
from utils import find_matching_file, replace_nan_with_none
from flask import abort, jsonify
from typing import Dict

ROOT_DIR = Path(__file__).parent.parent.resolve()
PROCESSED_DATA = os.path.join(ROOT_DIR, "data", "processed")


# Define file patterns
tabular_file_pattern = os.path.join(PROCESSED_DATA, "icu_tabular_features*")
icustays_file_pattern = os.path.join(PROCESSED_DATA, "icustays*")
icu_timeseries = os.path.join(PROCESSED_DATA, "icu_timeseries_features*")
icu_labevents = os.path.join(PROCESSED_DATA, "icu_chartevents_timeseries*")

# Search for matching files
ICU_TAB_FEATURES = find_matching_file(tabular_file_pattern, PROCESSED_DATA)
ICU_STAYS = find_matching_file(icustays_file_pattern, PROCESSED_DATA)
ICU_TIMESERIES = find_matching_file(icu_timeseries, PROCESSED_DATA)
ICU_LABEVENTS = find_matching_file(icu_labevents, PROCESSED_DATA)


@dataclass
class Patient:
    """Basic information of the patient, if an attribute is empty, it is shown as 'None'.

    Attributes:
    ----------
        subject_id: Unique identifier for the patient.
        hadm_id: Unique identifier for the hospital admission.
        stay_id: Unique identifier for the stay during the hospital admission.
        first_care_unit: The intensive care the user is confined to.
        los_hour_int: Length of stay in hours.
        gender: Gender of the patient.
        age: Age of the patient.
        first_name: First name of the patient.
        last_name: Last name of the patient.
        main_diagnosis: Main diagnosis for the patient during the hospital stay.
        will_be_readmitted: Boolean value indicating whether the person will be readmitted or not.
        intime: Admission time in Unix timestamp format.
        outtime: Discharge time in Unix timestamp format.
    """

    subject_id: int
    hadm_id: int
    stay_id: int
    first_care_unit: str
    los_hour_int: int
    gender: str
    age: int
    first_name: str
    last_name: str
    main_diagnosis: str
    will_be_readmitted: bool
    intime: int
    outtime: int


@dataclass
class TimeSeriesFeature:
    """Time series data for specific features of a patient.

    Attributes:
    ----------
        icu_stay_id: Unique identifier for the stay during the hospital admission.
        time: Time point for the data record.
        features: Dictionary of feature names and their corresponding values.
    """

    icu_stay_id: int
    time: str
    features: Dict[str, float]


def fetch_patient_details(stay_id: int) -> Patient:
    """Parses patient information based on ICU stay ID.

    Parameters:
    -----------
        stay_id : int
            ICU stay ID of the patient.

    Returns:
    --------
        Patient:
            A Patient instance with parsed information.
    """
    icustays = pd.read_feather(ICU_STAYS)
    icutabs = pd.read_feather(ICU_TAB_FEATURES)

    master_patient_data = pd.merge(
        icustays, icutabs[["subject_id", "anchor_age", "stay_id"]], on="subject_id", how="left"
    )

    # Filter patient record based on ICU stay ID
    patient_record = master_patient_data[master_patient_data["stay_id"] == stay_id]
    patient_record["icu_intime"] = pd.to_datetime(patient_record["icu_intime"])
    patient_record["icu_outtime"] = pd.to_datetime(patient_record["icu_outtime"])
    patient_record["icu_intime"] = patient_record["icu_intime"].dt.strftime("%Y-%m-%d %H:%M:%S")
    patient_record["icu_outtime"] = patient_record["icu_outtime"].dt.strftime("%Y-%m-%d %H:%M:%S")
    if patient_record.empty:
        return None
    patient_record = replace_nan_with_none(patient_record.iloc[0].to_dict())
    attributes = {
        "subject_id": patient_record.get("subject_id"),
        "hadm_id": patient_record.get("hadm_id"),
        "stay_id": patient_record.get("stay_id"),
        "first_care_unit": patient_record.get("first_careunit"),
        "los_hour_int": patient_record.get("icu_los"),
        "gender": patient_record.get("gender"),
        "age": patient_record.get("anchor_age"),
        "first_name": patient_record.get("first_name"),
        "last_name": patient_record.get("last_name"),
        "main_diagnosis": patient_record.get("main_diagnosis"),
        "will_be_readmitted": patient_record.get("will_be_readmitted"),
        "intime": patient_record.get("icu_intime"),
        "outtime": patient_record.get("icu_outtime"),
    }
    return Patient(**attributes)


def read_stayid(stay_id):
    result = fetch_patient_details(stay_id)
    if not result:
        abort(404, message="Could not find any patient of that associated stay id")
    return jsonify(result)


def fetch_patient_features(stay_id: int, features: list) -> TimeSeriesFeature:
    """Parses patient information based on ICU stay ID.

    Parameters:
    -----------
        stay_id : int
            ICU stay ID of the patient.

    Returns:
    --------
        TimeSeriesFeature:
            A Patient TimeSeriesFeature instance with parsed information.
    """
    print(features)
    icutime = pd.read_feather(ICU_TIMESERIES)

    final_dict = {"stay_id": stay_id}

    # Filter patient record based on ICU stay ID
    patient_record = icutime[icutime["stay_id"] == stay_id]
    if patient_record.empty:
        return None
    selected_columns = ["abs_event_time"] + features
    filtered_data = patient_record[selected_columns]
    filtered_data = replace_nan_with_none(filtered_data.to_dict())
    final_dict.update(filtered_data)

    return final_dict


def get_time_series_data(stay_id: int, features: str):
    features_list = features.split(",")
    if not stay_id:
        abort(400, description="Missing required parameter: stay_id")

    if not features:
        abort(400, description="Missing required parameter: features")

    data = fetch_patient_features(stay_id, features_list)
    if not data:
        abort(404, description="Time series data not found for the specified stay_id")

    return jsonify(data)
