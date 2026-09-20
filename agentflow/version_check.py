import logging
import os
import requests
from packaging import version

from agentflow.__version__ import __version__ as current_version

VERSION_URL = os.getenv(
    "AGENTFLOW_VERSION_URL", "https://docs.agentflow.ai/version.json"
)
logger = logging.getLogger(__name__)

def check_for_newer_version() -> str:
    """
    Check if a newer version of AgentFlow is available.
    
    Makes an HTTP request to the docs site to retrieve the latest version information,
    then compares it to the current version. If a newer version is available, returns
    a message suggesting to upgrade.
    
    Returns:
        str: Update message if a newer version is available, otherwise an empty string
    """
    try:
        logger.debug(f"Checking for newer version at {VERSION_URL}")
        response = requests.get(VERSION_URL, timeout=5)
        response.raise_for_status()
        
        version_info = response.json()
        latest_version = version_info.get("version")
        
        if not latest_version:
            logger.warning("No version found in the version.json file")
            return ""
        
        logger.debug(f"Current version: {current_version}, Latest version: {latest_version}")
        
        if version.parse(latest_version) > version.parse(current_version):
            logger.info(f"New version available: {latest_version}")
            return (f"A new version of AgentFlow is available! Consider upgrading to {latest_version} "
                   "to have access to the latest features and functionality.")
        
        logger.debug("Current version is up-to-date")
        return ""
        
    except requests.RequestException as e:
        logger.error(f"Error connecting to version check URL: {e}")
        return ""
    except ValueError as e:
        logger.error(f"Error parsing version.json: {e}")
        return ""
    except Exception as e:
        logger.error(f"Unexpected error during version check: {e}")
        return ""
