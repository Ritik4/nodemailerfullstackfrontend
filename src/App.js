import "./App.css";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";
import styles from "./style";
import format from "date-fns/format";
import axios from "axios";

function App() {
  const [value, setValue] = useState(new Date());
  const [Schedule, setSchedule] = useState({
    emailFrom: "",
    emailTo: "",
    time: "",
    month: "",
    day: "",
  });
  const onSubmit = (data) => {
    axios.get("https://email-fullstack-backend.herokuapp.com", {
      params: data,
    });

    setSchedule({
      emailFrom: "",
      emailTo: "",
      time: "",
      month: "",
      day: "",
    });
  };
  const onStop = (data) => {
    axios.get("https://email-fullstack-backend.herokuapp.com/stop");
  };
  return (
    <Box sx={styles.App}>
      <Box component="div" sx={styles.container}>
        <TextField
          id="outlined-basic"
          label="Email from"
          value={Schedule.emailFrom}
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          onChange={(e) => {
            setSchedule({ ...Schedule, emailFrom: e.target.value });
            console.log(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          value={Schedule.emailTo}
          label="Email to"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          onChange={(e) => {
            setSchedule({ ...Schedule, emailTo: e.target.value });
            console.log(e.target.value);
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            ampm={false}
            openTo="hours"
            views={["hours", "minutes", "seconds"]}
            inputFormat="HH:mm:ss"
            mask="__:__:__"
            label="Time"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              setSchedule({ ...Schedule, time: format(newValue, "ss mm HH") });
              // console.log(format(newValue, "ss mm HH"));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          id="outlined-basic"
          label="Month"
          value={Schedule.month}
          variant="outlined"
          sx={{ margin: "20px 0px" }}
          onChange={(e) => {
            setSchedule({ ...Schedule, month: e.target.value });
            console.log(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="week Day"
          value={Schedule.day}
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          onChange={(e) => {
            setSchedule({ ...Schedule, day: e.target.value });
            console.log(e.target.value);
          }}
        />
        <Button
          sx={{ marginTop: "20px" }}
          variant="contained"
          onClick={() => onSubmit(Schedule)}
        >
          Send
        </Button>
        <Button
          sx={{ marginTop: "20px" }}
          variant="contained"
          onClick={() => onStop()}
        >
          Stop
        </Button>
      </Box>
    </Box>
  );
}

export default App;
