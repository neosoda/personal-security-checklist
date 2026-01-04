import logging
import os
import tempfile
from pathlib import Path

from validate import load_schema, load_yaml, validate_yaml

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

PROJECT_ROOT = Path(__file__).resolve().parents[1]
YAML_FILE_PATH = PROJECT_ROOT / "personal-security-checklist.yml"
MARKDOWN_FILE_PATH = PROJECT_ROOT / "CHECKLIST.md"
SCHEMA_PATH = PROJECT_ROOT / "lib" / "schema.json"


def read_yaml(file_path: Path):
    logger.info("Reading YAML file from %s...", file_path)
    return load_yaml(file_path)

def generate_markdown_section(section):
    markdown = f"## {section['title']}\n\n"
    markdown += f"{section['intro']}\n\n"
    markdown += "**Security** | **Priority** | **Details and Hints**\n"
    markdown += "--- | --- | ---\n"
    for item in section['checklist']:
        markdown += f"**{item['point']}** | {item['priority']} | {item['details']}\n"
    
    if 'softwareLinks' in section:
        software_links = [software for software in section['softwareLinks'] if 'title' in software and 'url' in software]
        if software_links:
            markdown += "\n### Recommended Software\n"
            for software in software_links:
                markdown += f"- [{software['title']}]({software['url']})\n"
    
    return markdown

def insert_markdown_content(md_file_path: Path, new_content: str):
    start_marker, end_marker = "<!-- checklist-start -->", "<!-- checklist-end -->"
    logger.info("Inserting generated markdown into %s between markers...", md_file_path)

    content = md_file_path.read_text(encoding="utf-8")

    start_index = content.find(start_marker)
    end_index = content.find(end_marker, start_index)

    if start_index == -1 or end_index == -1:
        raise ValueError("Checklist markers not found in the markdown file.")
    if end_index < start_index:
        raise ValueError("Checklist markers are out of order in the markdown file.")

    updated_content = (
        content[: start_index + len(start_marker)]
        + "\n"
        + new_content
        + "\n"
        + content[end_index:]
    )

    if updated_content == content:
        logger.info("Markdown already up to date. No changes written.")
        return

    with tempfile.NamedTemporaryFile("w", encoding="utf-8", delete=False, dir=md_file_path.parent) as handle:
        handle.write(updated_content)
        temp_path = Path(handle.name)

    os.replace(temp_path, md_file_path)
    logger.info("Markdown content successfully inserted.")

def main():
    yaml_data = read_yaml(YAML_FILE_PATH)
    schema = load_schema(SCHEMA_PATH)
    errors = validate_yaml(yaml_data, schema)
    if errors:
        raise SystemExit("YAML schema validation failed. Aborting markdown generation.")

    markdown_content = ""
    for section in yaml_data:
        markdown_content += generate_markdown_section(section) + "\n\n"
    insert_markdown_content(MARKDOWN_FILE_PATH, markdown_content)
    logger.info("Script completed successfully!")

if __name__ == "__main__":
    main()
