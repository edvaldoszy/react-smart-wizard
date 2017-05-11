import * as React from "react";
import { render } from "react-dom";

import ReactSmartWizard, { ReactSmartWizardStep } from "react-smart-wizard";

class Application extends React.Component<undefined, undefined> {
    
    private onStepChange(index) {
        console.log("Changed to step: " + index);
    }
    
    private blockNextStep() {
        return false;
    }

    render() {
        return (
            <ReactSmartWizard
                cycleSteps={true}
                onStepChange={this.onStepChange.bind(this)}>
                <ReactSmartWizardStep
                    title="Step title 1">
                    <h1>Conteúdo da step 1</h1>
                </ReactSmartWizardStep>
                <ReactSmartWizardStep
                    title="Step title 2">
                    <h1>Conteúdo da step 2</h1>
                </ReactSmartWizardStep>
                <ReactSmartWizardStep
                    beforeStepChange={this.blockNextStep.bind(this)}
                    title="Step title 3">
                    <h1>Conteúdo da step 3</h1>
                </ReactSmartWizardStep>
                <ReactSmartWizardStep
                    title="Step title 4">
                    <h1>Conteúdo da step 4</h1>
                </ReactSmartWizardStep>
                <ReactSmartWizardStep
                    title="Step title 5">
                    <h1>Conteúdo da step 5</h1>
                </ReactSmartWizardStep>
            </ReactSmartWizard>
        );
    }
}

render(<Application />, document.getElementById("application"));
