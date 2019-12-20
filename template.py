# -*- coding: utf-8 -*-

from jinja2 import Template
import yaml, datetime

data = yaml.full_load(open("data.yaml", "r"))
data["metadata"]["updated_time"] = datetime.datetime.now().strftime("%Y/%m/%d")

template_html = open("template.html", "r").read().decode('utf-8')
result_writer = open("index.html", "w")
template = Template(template_html)
result_html = template.render(data)
result_writer.write(result_html.encode("utf-8"))