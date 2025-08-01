import logging
import random
import warnings
from argparse import Namespace
from typing import Any, MutableMapping

import numpy as np
from omegaconf import DictConfig

from src.utils import rich_utils

max_seed_value = np.iinfo(np.uint32).max
min_seed_value = np.iinfo(np.uint32).min


def get_logger(name=__name__) -> logging.Logger:
    """Initializes multi-GPU-friendly python command line logger."""

    logger = logging.getLogger(name)

    # TODO not needed right now.
    # # this ensures all logging levels get marked with the rank zero decorator
    # # otherwise logs would get multiplied for each GPU process in multi-GPU setup
    # for level in (
    #     "debug",
    #     "info",
    #     "warning",
    #     "error",
    #     "exception",
    #     "fatal",
    #     "critical",
    # ):
    #     setattr(logger, level, rank_zero_only(getattr(logger, level)))

    return logger


log = get_logger(__name__)


def extras(cfg: DictConfig) -> None:
    """Applies optional utilities before the task is started.

    Utilities:
        - Ignoring python warnings
        - Setting tags from command line
        - Rich config printing

    :param cfg: A DictConfig object containing the config tree.
    """
    # return if no `extras` config
    if not cfg.get("extras"):
        log.warning("Extras config not found! <cfg.extras=null>")
        return

    # disable python warnings
    if cfg.extras.get("ignore_warnings"):
        log.info("Disabling python warnings! <cfg.extras.ignore_warnings=True>")
        warnings.filterwarnings("ignore")

    # # prompt user to input tags from command line if none are provided in the config
    # if cfg.extras.get("enforce_tags"):
    #     log.info("Enforcing tags! <cfg.extras.enforce_tags=True>")
    #     rich_utils.enforce_tags(cfg, save_to_file=True)

    # pretty print config tree using Rich library
    if cfg.extras.get("print_config"):
        log.info("Printing config tree with Rich! <cfg.extras.print_config=True>")
        rich_utils.print_config_tree(cfg, resolve=False, save_to_file=False)


# adapted and simplified from pytorch-lightning
def seed_everything(seed: int | None = None, workers: bool = False) -> int:
    """Function that sets seed for pseudo-random number generators in: pytorch, numpy,
    python.random In addition, sets the following environment variables:

    Args:
        seed: the integer value seed for global random state.
            If `None`, will select it randomly.
    """
    if seed is None:
        seed = _select_seed_randomly(min_seed_value, max_seed_value)
        log.warn(f"No seed found, seed set to {seed}")
    elif not isinstance(seed, int):
        seed = int(seed)

    if not (min_seed_value <= seed <= max_seed_value):
        log.warn(
            f"{seed} is not in bounds, numpy accepts from {min_seed_value} to {max_seed_value}"
        )
        seed = _select_seed_randomly(min_seed_value, max_seed_value)

    log.info(f"Global seed set to {seed}")
    random.seed(seed)
    np.random.seed(seed)
    # torch.manual_seed(seed)
    # torch.cuda.manual_seed_all(seed)

    return seed


def tied_sampler(config, config_key):
    # returns whatever is in tune config at [key] to tie the variables together
    return config[config_key]


def _select_seed_randomly(
    min_seed_value: int = min_seed_value, max_seed_value: int = max_seed_value
) -> int:
    return random.randint(min_seed_value, max_seed_value)


def _convert_params(params: dict[str, Any] | Namespace | None) -> dict[str, Any]:
    """Ensure parameters are a dict or convert to dict if necessary.

    Args:
        params: Target to be converted to a dictionary

    Returns:
        params as a dictionary
    """
    # in case converting from namespace
    if isinstance(params, Namespace):
        params = vars(params)

    if params is None:
        params = {}

    return params


def _flatten_dict(
    params: MutableMapping[Any, Any], delimiter: str = "/", parent_key: str = ""
) -> dict[str, Any]:
    """Flatten hierarchical dict, e.g. ``{'a': {'b': 'c'}} -> {'a/b': 'c'}``.

    Args:
        params: Dictionary containing the hyperparameters
        delimiter: Delimiter to express the hierarchy. Defaults to ``'/'``.

    Returns:
        Flattened dict.

    Examples:
        >>> _flatten_dict({'a': {'b': 'c'}})
        {'a/b': 'c'}
        >>> _flatten_dict({'a': {'b': 123}})
        {'a/b': 123}
        >>> _flatten_dict({5: {'a': 123}})
        {'5/a': 123}
    """
    result: dict[str, Any] = {}
    for k, v in params.items():
        new_key = parent_key + delimiter + str(k) if parent_key else str(k)
        if isinstance(v, Namespace):
            v = vars(v)
        if isinstance(v, MutableMapping):
            result = {**result, **_flatten_dict(v, parent_key=new_key, delimiter=delimiter)}
        else:
            result[new_key] = v
    return result
