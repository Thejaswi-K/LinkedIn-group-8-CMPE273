import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Card from "@material-ui/core/Card/Card";

class Skills extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        this.list = ["Android", "Java", "iOS"]


        return (
            <Card className="w-75 p-3 ml-5">

                <div className="card-header">
                    Skills
                </div>
                <ul className="list-group list-group-flush">
                    <div className="mt-4">
                        {this.list.map((experience, index) => (
                            <li key={index} className="ml-5">
                                <h4><strong>{experience}</strong>
                                </h4>
                                <hr/>

                            </li>
                        ))}
                    </div>
                </ul>

            </Card>
        )
    }

}

export default Skills