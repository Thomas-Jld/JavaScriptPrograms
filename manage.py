#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import json

# if len(sys.argv) == 3 and sys.argv[1] == "runserver":
#     f = open('static/infos.json')
#     rawData = f.read()
#     f.close()
#
#     data = json.loads(rawData)
#
#     f = open('static/infos.json', 'w')
#     host = sys.argv[2].split(':')
#     data["ip"] = host[0]+ ":" + str(int(host[1])+1)
#     f.write(str(data).replace("\'", "\""))
#     f.close()


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'JsPrograms.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
