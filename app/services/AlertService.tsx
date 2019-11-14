import { Alert, AlertButton } from "react-native";

import mainTranslations from 'app/mainTranslations';
import { UtilityHelper } from "./UtilityHelper";

export enum AlertType {
    error,
    info,
    success,
    warning
}

export interface IAlertButton {
    text?: string;
    style?: 'default' | 'cancel' | 'destructive';
}

class AlertService {
    static alert(message: string, title?: string, alertType: AlertType = AlertType.info, buttons: Array<IAlertButton> = []): Promise<boolean> {
        if (!title) {
            switch (alertType) {
                case AlertType.warning:
                    title = mainTranslations.alert.warningTitle;

                    break;
                case AlertType.error:
                    title = mainTranslations.alert.errorTitle;

                    break;
                default:
                    title = mainTranslations.alert.infoTitle;

                    break;
            }
        }

        return new Promise((resolve, reject) => {
            let alertButtons: Array<AlertButton> = buttons;

            if (UtilityHelper.isEmpty(alertButtons)) {
                alertButtons.push({
                    onPress: () => {
                        resolve(true)
                    },
                    style: 'default',
                    text: mainTranslations.shared.ok
                });
            }
            else {
                if (!alertButtons.some((alertButton) => alertButton.style == 'cancel')) {
                    alertButtons.unshift({
                        style: 'cancel',
                        text: mainTranslations.shared.cancel
                    });
                }

                alertButtons.forEach((alertButton) => {
                    if (alertButton.style == 'cancel') {
                        alertButton.onPress = () => {
                            resolve(false);
                        };
                    }
                    else {
                        alertButton.onPress = () => {
                            resolve(true);
                        }
                    }
                })
            }

            Alert.alert(title!, message, alertButtons, {
                onDismiss: () => {
                    resolve(false);
                }
            });
        })
    }

    static error(error: Error, title?: string): Promise<boolean>;
    static error(message: string, title?: string): Promise<boolean>;
    static error(message: string, title: string, buttons: Array<IAlertButton>): Promise<boolean>;
    static error(errorOrmessage: any, title?: string, buttons?: Array<IAlertButton>) {
        let message: string;

        if (UtilityHelper.isError(errorOrmessage)) {
            message = (errorOrmessage as Error).message;
        }
        else {
            message = errorOrmessage;
        }

        return this.alert(message, title, AlertType.error, buttons);
    }

    static debug(obj: any) {
        return this.alert(JSON.stringify(obj));
    }

    static success(message: string, title?: string) {
        return this.alert(message, title, AlertType.success);
    }

    static warning(message: string, title?: string, buttons: Array<IAlertButton> = []) {
        return this.alert(message, title, AlertType.warning, buttons);
    }
}

export default AlertService;
