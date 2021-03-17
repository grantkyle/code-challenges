import React, { useState, useEffect } from "react";
import Select from "react-select";
import fareData from "../../assets/fares.json";
import "./styles.css";

const FareWidget = (props) => {
  const [showZoneOptions, setShowZoneOptions] = useState("CCP/1");
  const [selectedTimeOption, setSelectedTimeOption] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [numberOfFares, setNumberOfFares] = useState(1);
  const timeOptions = [
    { label: "Week Day", value: "weekday" },
    { label: "Evening or Weekends", value: "evening_weekend" },
    { label: "Any TIME!", value: "advance_purchase" },
  ];
  const [totalFare, setTotalFare] = useState(0);

  const zoneOptions = fareData.zones.map(({ name, zone }) => {
    return { label: name, value: zone };
  });

  const parseFareData = JSON.parse(JSON.stringify(fareData));

  const handleNumberOfFares = (value) => {
    setNumberOfFares(value);
  };

  useEffect(() => {
    if (showZoneOptions && selectedTimeOption && radioValue && numberOfFares) {
      setTotalFare(
        parseFareData.zones
          .find(({ zone }) => {
            return showZoneOptions.value === zone;
          })
          .fares.find(
            ({ purchase, type }) =>
              radioValue === purchase && type === selectedTimeOption
          ).price * numberOfFares
      );
    }
  }, [showZoneOptions, selectedTimeOption, radioValue, numberOfFares]);

  return (
    <div>
      <div className="fare-widget__container">
        <Select
          name="zones"
          options={zoneOptions}
          onChange={(value) => {
            setShowZoneOptions(value);
          }}
        />
        <Select
          options={timeOptions}
          onChange={({ value }) => {
            setSelectedTimeOption(value);
          }}
        />
        <div
          onChange={(e) => {
            setRadioValue(e.target.value);
          }}
        >
          <input type="radio" value="onboard_purchase" name="onboard" /> Onboard
          <input type="radio" value="advance_purchase" name="advance" /> Advance
        </div>
        <input
          type="number"
          options={numberOfFares}
          onChange={(e) => {
            // console.log("setNumberOfFares", e.target.value);
            handleNumberOfFares(parseInt(e.target.value));
          }}
        />
      </div>
    </div>
  );
};

export default FareWidget;
