import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Switch, FormControlLabel, Checkbox } from "@mui/material";
import { useDrag } from "react-dnd";

const TableSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  minCovers: Yup.number().min(1).required("Required"),
  maxCovers: Yup.number().min(1).required("Required"),
});

const TableDetails: React.FC = () => {
  const [{ isDragging: isDragging1 }, drag1] = useDrag(() => ({
    type: "image",
    item: { id: "tableImage1", src: "/Table.svg" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isDragging: isDragging2 }, drag2] = useDrag(() => ({
    type: "image",
    item: { id: "tableImage2", src: "/Mid.svg" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Formik
      initialValues={{
        name: "",
        minCovers: 1,
        maxCovers: 1,
        isActive: true,
        advancedSettings: false,
      }}
      validationSchema={TableSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="space-y-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold border-b-2 border-[#e35248] w-36 pb-2">
              Tables
            </h3>
          </div>

          <div className="mb-6 text-center">
            <h4 className="text-xl font-semibold text-gray-800">
              Table Options
            </h4>

            <div className="text-center mt-4">
              <p className="mb-4 text-gray-500">Drag and Drop your tables</p>
              <div className="flex justify-center space-x-4 mb-4">
                <img
                  ref={drag1}
                  src="/Table.svg"
                  alt="Table Image 1"
                  className="w-24 h-24 object-cover"
                  style={{ opacity: isDragging1 ? 0.5 : 1 }}
                />
                <img
                  ref={drag2}
                  src="/Mid.svg"
                  alt="Table Image 2"
                  className="w-24 h-24 object-cover"
                  style={{ opacity: isDragging2 ? 0.5 : 1 }}
                />
              </div>
            </div>
          </div>

          <hr className="my-4 border-t-2 border-gray-200" />

          <div className="text-center">
            <h2 className="text-lg font-bold">Table Details</h2>
          </div>

          <div className="flex items-center mb-4 justify-between">
            <label className="block text-sm font-medium w-1/4 text-left">
              Table Name:
            </label>
            <Field
              name="name"
              className="border p-2 rounded w-1/4 text-right"
              placeholder=""
              as="input"
            />
          </div>

          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium w-1/4 text-left">
              Min Covers:
            </label>
            <div className="flex items-center w-3/4 justify-end space-x-2">
              <button
                type="button"
                onClick={() =>
                  setFieldValue("minCovers", Math.max(1, values.minCovers - 1))
                }
                aria-label="decrease min covers"
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <img
                  src="/Negative.svg"
                  alt="Decrease Min Covers"
                  className="w-4 h-4"
                />
              </button>
              <span>{values.minCovers}</span>
              <button
                type="button"
                onClick={() => setFieldValue("minCovers", values.minCovers + 1)}
                aria-label="increase min covers"
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <img
                  src="/Positive.svg"
                  alt="Increase Min Covers"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium w-1/4 text-left">
              Max Covers:
            </label>
            <div className="flex items-center w-3/4 justify-end space-x-2">
              <button
                type="button"
                onClick={() =>
                  setFieldValue("maxCovers", Math.max(1, values.maxCovers - 1))
                }
                aria-label="decrease max covers"
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <img
                  src="/Negative.svg"
                  alt="Decrease Max Covers"
                  className="w-4 h-4"
                />
              </button>
              <span>{values.maxCovers}</span>
              <button
                type="button"
                onClick={() => setFieldValue("maxCovers", values.maxCovers + 1)}
                aria-label="increase max covers"
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <img
                  src="/Positive.svg"
                  alt="Increase Max Covers"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          <div className="flex items-center mb-4 justify-between">
            <span className="text-sm font-medium w-1/4 text-left">Online</span>
            <FormControlLabel
              label={values.isActive ? "Active" : "Inactive"}
              control={
                <Switch
                  checked={values.isActive}
                  onChange={() => setFieldValue("isActive", !values.isActive)}
                  name="isActive"
                  color="primary"
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#e35248", // Custom color for the switch handle
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#e35248", // Custom color for the switch track when checked
                    },
                    "& .MuiSwitch-switchBase": {
                      "&:hover": {
                        backgroundColor: "rgba(227, 82, 72, 0.1)", // Optional hover effect
                      },
                    },
                  }}
                  className="ml-2" // Margin between label and switch
                />
              }
              labelPlacement="start" // Moves the label before the switch
            />
          </div>

          <hr className="my-4 border-t-2 border-gray-200" />

          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium w-2/4 text-left">
              Advanced Settings
            </span>
            <Checkbox
              checked={values.advancedSettings}
              onChange={() =>
                setFieldValue("advancedSettings", !values.advancedSettings)
              }
              color="primary"
              className="ml-auto"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TableDetails;
