import React from "react";
import Paper from '@material-ui/core/Paper';
import {
    TiBatteryCharge,
    TiBatteryFull,
    TiBatteryHigh,
    TiBatteryLow
} from 'react-icons/ti'
import robot from "../services/api"

class VectorBatteryStatus extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            battery_level: null,
            is_charging: null,
            suggested_charger_sec: null
        };
        this.timer = null;
    };

    fetchData() {
        robot.getBatteryState()
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        battery_level: result.battery_level,
                        is_charging: result.is_charging,
                        suggested_charger_sec: result.suggested_charger_sec
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error//
                    });
                }
            )

    };

    componentDidMount() {
        // This will be called just once
        this.fetchData();
        this.timer = setInterval(() => this.fetchData(), 1000);
    }

    componentWillUnmount() {
        // It's necessary to do this otherwise the interval
        // will be executed even if the component is not present anymore.
        clearInterval(this.timer);
    }

    render() {
        const {
            error,
            isLoaded,
            battery_level,
            is_charging,
            suggested_charger_sec
        } = this.state;

        // Handle server errors
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        }

        // Choose the battery icon
        let battery_icon = null;
        if (is_charging) {
            battery_icon = TiBatteryCharge
        } else {
            battery_icon = {
                "BATTERY_LEVEL_FULL": TiBatteryFull,
                "BATTERY_LEVEL_NOMINAL": TiBatteryHigh,
                "BATTERY_LEVEL_LOW": TiBatteryLow,
                "BATTERY_LEVEL_UNKNOWN": TiBatteryLow
            }[battery_level]
        }

        // Choose the 'charge time' text
        let charge_time_text = "";
        if (is_charging && suggested_charger_sec > 0) {
            var date = new Date(null);
            date.setSeconds(suggested_charger_sec);
            charge_time_text = "Charge Time: ";
            charge_time_text += date.toISOString().substr(14, 5);  // 11, 8
        }

        return (
            <Paper>
                <div style={{marginBottom: "-20px"}}>
                    {battery_icon({size: 100})}
                </div>
                <div>
                    {charge_time_text}
                </div>

            </Paper>
        )

    }
}

export default VectorBatteryStatus