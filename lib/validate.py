import json
import logging
from pathlib import Path

import jsonschema
import yaml

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SCHEMA_PATH = PROJECT_ROOT / "lib" / "schema.json"
DEFAULT_YAML_PATH = PROJECT_ROOT / "personal-security-checklist.yml"


def load_yaml(path: Path):
    logger.info("Loading YAML from %s", path)
    with path.open("r", encoding="utf-8") as handle:
        return yaml.safe_load(handle)


def load_schema(path: Path):
    logger.info("Loading JSON schema from %s", path)
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def validate_yaml(data, schema):
    validator = jsonschema.Draft7Validator(schema)
    errors = sorted(validator.iter_errors(data), key=lambda err: err.path)
    if not errors:
        logger.info("YAML validation passed.")
        return []

    for error in errors:
        location = ".".join(str(segment) for segment in error.path) or "<root>"
        logger.error("Schema validation error at %s: %s", location, error.message)
    return errors


def main() -> int:
    yaml_data = load_yaml(DEFAULT_YAML_PATH)
    schema = load_schema(DEFAULT_SCHEMA_PATH)
    errors = validate_yaml(yaml_data, schema)
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
