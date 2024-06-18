import os
import glob
import logging
import math

# Configure logging
logging.basicConfig(
    filename="app.log", level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s"
)

# Get the logger
logger = logging.getLogger(__name__)


def find_matching_file(file_pattern, processed_data):
    """Instead of hardcoding the file name this function will detect whatever version of the
    required file is available.

    Args:
        file_pattern : os.PathLike[str]:

    Returns:
        file_path: os.PathLike[str]
    """
    matching_files = glob.glob(file_pattern)
    if matching_files:
        matching_file = os.path.basename(matching_files[0])
        file_path = os.path.join(processed_data, matching_file)
        logger.info(f"Found file: {file_path}")
        return file_path
    else:
        logger.error(f"No matching file found for pattern: {file_pattern}")
        return None


def replace_nan_with_none(data):
    """Replace "NaN" values with "null"."""
    if isinstance(data, dict):
        return {k: replace_nan_with_none(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [replace_nan_with_none(item) for item in data]
    elif isinstance(data, float) and math.isnan(data):
        return None
    else:
        return data
