'use strict';

const fs = require('fs');
const jsonpath = require('jsonpath-plus').JSONPath;
const jsonpointer = require('json-pointer');
const yaml = require('yaml');
const ajv = new (require("ajv/dist/2020"))({ allErrors: true });
require("ajv-formats")(ajv);

function create(schemaFile) {
  const ajvValidate = ajv.compile(yaml.parse(fs.readFileSync(schemaFile, 'UTF-8')));

  async function validate(document) {
    const valid = ajvValidate(document);
    const errors = valid ? [] : ajvValidate.errors;

    // validate $ref type references
    const typeRefs = jsonpath({ resultType: 'pointer', path: '$..type["$ref"]', json: document });
    typeRefs.forEach(typeRefPointer => {
      const typeRefValue = jsonpointer.get(document, typeRefPointer);
      if (typeof (typeRefValue) === 'string' && typeRefValue.startsWith('#/components/types/')) {
        const targetPointer = jsonpointer.parse(typeRefValue.replace(/^#/, ''));
        const targetType = jsonpointer.has(document, targetPointer) && jsonpointer.get(document, targetPointer);
        if (targetType) {
          return;
        }
      }
      errors.push({
        instancePath: typeRefPointer,
        schemaPath: '.../type/$ref',
        message: 'must be reference to defined type',
        params: {
          typeRefValue,
        },
      });
    });

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  return {
    name: 'ajv',
    validate,
  }
}

module.exports = {
  create,
}
