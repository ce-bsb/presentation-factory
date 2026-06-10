PYTHON ?= python3
PRESENTATION ?= bb-dirco-workshop
MODEL ?= primary
CLI = PYTHONPATH=src $(PYTHON) -m presentation_factory

.PHONY: build list test validate

build:
	$(CLI) build $(PRESENTATION) --model $(MODEL)

validate:
	$(CLI) validate

list:
	$(CLI) list

test:
	PYTHONPATH=src $(PYTHON) -m unittest discover -s tests -v
