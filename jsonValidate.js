/**
 * Validate JSON data against the schema
 */
const fs = require("fs");
const validate = require("jsonschema").validate;
const jsonfile = require("jsonfile");

var args = process.argv.slice(2);
const filepath = args[0];
const schemapath = args[1];

console.log("\n/// JSON SCHEMA VALIDATOR ///");

// Read JSON data
jsonfile.readFile(filepath, function (err, data) {
  if (err) throw err;

  // JSON schema
  const schema = jsonfile.readFileSync(schemapath);
  // console.dir(jsonfile.readFileSync(schemapath));

  // Validation
  const validateResult = validate(data, schema);

  if (validateResult.valid) {
    console.info(
      "The given JSON data (" +
        filepath +
        ") is *VALID* against schema - " +
        schemapath
    );
    return;
  }
  console.log(
    "\nThe given JSON data (" +
      filepath +
      ") is *INVALID* against schema - " +
      schemapath
  );
  // console.log("validation result:", validateResult);
  console.log("\nThe following errors were found in given data:");

  validateResult.errors.map((err, index) =>
    console.log(index + ":", err.stack)
  );
});
