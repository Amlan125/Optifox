import pytest
from pandas import Timestamp
from Code.patient_info import fetch_patient_details, Patient, read_stayid


class TestAPI:
    def test_patient_details(self):
        expected_output = Patient(
            subject_id=10023117,
            hadm_id=21133938,
            stay_id=30057454.0,
            first_care_unit="Medical Intensive Care Unit (MICU)",
            los_hour_int=6.605625,
            gender=None,
            age=53.0,
            first_name=None,
            last_name=None,
            main_diagnosis=None,
            will_be_readmitted=False,
            intime=Timestamp("2175-03-21 03:20:53"),
            outtime=Timestamp("2175-03-27 17:52:59"),
        )

        actual_output = fetch_patient_details(30057454)

        assert expected_output == actual_output

    def test_read_stay_id_invalid(self):
        with pytest.raises(TypeError):
            read_stayid(2323232)
