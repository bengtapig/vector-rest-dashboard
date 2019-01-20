import React from "react";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import robot from '../services/api'

class VectorMove extends React.Component {
    constructor() {
        super();
        this.state = {
            success: false
        };
        this.timer = null;
    };

    driveStraight(distance, speed) {
        robot.driveStraight(distance, speed)
            .then(
                (result) => {
                    this.setState({
                        success: true
                    });
                },
                (error) => {
                    this.setState({
                        error//
                    });
                }
            )
    };

    render() {
        const {success} = this.state;

        return (
            <Paper>
                <div>ayy</div>
                <div>
                    <Button
                        onClick={() => this.driveStraight(100, 60)}
                    >
                        Forward
                    </Button>
                </div>
                <div>
                    <Button>
                        Backward
                    </Button>
                </div>
            </Paper>
        )

    }
}

export default VectorMove