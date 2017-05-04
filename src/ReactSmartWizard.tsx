import * as React from "react";
import ReactSmartWizardStep, { ReactSmartWizardStepProps } from "./ReactSmartWizardStep";

export type Callback = (index: number) => void;

export interface ReactSmartWizardProps {
    selected?: number;
    cycleSteps: boolean;
    beforeStepChange?: Callback;
    afterStepChange?: Callback;
}

class ReactSmartWizard extends React.Component<ReactSmartWizardProps, any> {

    private cycleSteps: boolean;
    private beforeStepChange: Callback;
    private afterStepChange: Callback;

    private steps: ReactSmartWizardStep[];

    constructor(props) {
        super(props);

        this.cycleSteps = props.cycleSteps || false;
        this.beforeStepChange = props.beforeStepChange || function() { return true; };
        this.afterStepChange = props.afterStepChange || function() { return true; };

        this.state = {
            selected: props.selected || 0
        };

        this.test();
    }

    test() {
        let self = this;
        this.steps = React.Children.map<any>(this.props.children, (child: React.ReactChild, index: number) => {
            let c = child as React.ReactElement<ReactSmartWizardStepProps>;
            return (
                <ReactSmartWizardStep 
                    {...c.props}
                    onFinishLoad={self.afterStepChange.bind(self, index)} />
            );
        });
    }

    private _onPrevButtonClick() {
        let selected = this.state.selected;
        this.beforeStepChange(selected);

        if (selected < 1) {
            // não pode diminuir mais :)
            return;
        }

        selected--;
        this.setState({
            selected: selected
        });
    }

    private _onNextButtonClick() {
        let selected = this.state.selected;
        if (!this.beforeStepChange(selected)) {
            return;
        }

        if (selected >= (this.steps.length - 1)) {
            if (this.props.cycleSteps) {
                selected = 0;
            } else {
                // não pode aumentar mais :)
                return;
            }
        } else {
            selected++;
        }

        this.setState({
            selected: selected
        });
    }

    public nextStep() {
        this._onNextButtonClick();
    }

    public prevStep() {
        this._onPrevButtonClick();
    }

    render() {
        return (
            <div>
                <div>{this.steps[this.state.selected]}</div>
                <div>
                    <button onClick={this._onPrevButtonClick.bind(this)}>Prev</button>
                    <button onClick={this._onNextButtonClick.bind(this)}>Next</button>
                </div>
            </div>
        );
    }
}

export default ReactSmartWizard;
