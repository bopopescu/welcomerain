#!/usr/bin/env python
# by bond
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "welcome_rain.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
