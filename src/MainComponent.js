import React from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";

import Row from "./RowComponent";
import Button from "./ButtonComponent";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202020",
        justifyContent: "flex-end"
    },
    value: {
        color: "#fff",
        fontSize: 40,
        textAlign: "right",
        marginRight: 20,
        marginBottom: 10
    }
});

export default MainComponent = (props) => {
    const [currentValue, setCurrentValue] = React.useState("0");
    const [previousValue, setPreviousValue] = React.useState(null);
    const [previousButton, setPreviousButton] = React.useState(null);
    const [operator, setOperator] = React.useState(null);

    const handlePress = (type, value) => {
        if (type === "number") {
            if (previousButton == "operator") {
                setPreviousValue(currentValue);
                setCurrentValue(value.toString());
            } else {
                if (Number(currentValue) == 0) {
                    setCurrentValue(value.toString());
                } else {
                    setCurrentValue(currentValue + value.toString());
                }
            }
        } else if (type === "operator" || type === "%" || type === "equal") {
            let number;
            if (previousValue === null) {
                number = Number(currentValue);
            } else {
                number = Number(previousValue);
                switch (operator) {
                    case "+":
                        number += Number(currentValue);
                        break;
                    case "-":
                        number -= Number(currentValue);
                        break;
                    case "*":
                        number *= Number(currentValue);
                        break;
                    case "/":
                        if (Number(currentValue) === 0) {
                            setCurrentValue("NaN");
                        } else {
                            number /= Number(currentValue);
                        }
                        break;

                }
            }
            if (type === "%") {
                number /= 100;
                setCurrentValue(number.toString());
                setPreviousValue(null);
                setOperator(null);
            } else if (type === "equal") {
                setCurrentValue(number.toString());
                setPreviousValue(null);
                setPreviousButton(type);
                setOperator(null);
            } else if (type == "operator") {
                setCurrentValue(number.toString());
                setPreviousValue(null);
                setOperator(value);
            }
        } else {
            switch (type) {
                case "C":
                    setCurrentValue("0");
                    setPreviousValue(null);
                    setOperator(null);
                    break;
                case "+/-":
                    setCurrentValue((-1 * Number(currentValue)).toString());
                    break;
                case "point":
                    setCurrentValue(currentValue + ".");
                    break;
                default:

            }

        }
        setPreviousButton(type);
    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
                <Text style={styles.value}>
                    {Number(currentValue).toLocaleString()}
                </Text>
                <Row>
                    <Button
                        text="C"
                        theme="secondary"
                        onPress={() => handlePress("C")}
                    />
                    <Button
                        text="+/-"
                        theme="secondary"
                        onPress={() => handlePress("+/-")}
                    />
                    <Button
                        text="%"
                        theme="secondary"
                        onPress={() => handlePress("%")}
                    />
                    <Button
                        text="/"
                        theme="accent"
                        onPress={() => handlePress("operator", "/")}
                    />
                </Row>

                <Row>
                    <Button text="7" onPress={() => handlePress("number", "7")} />
                    <Button text="8" onPress={() => handlePress("number", "8")} />
                    <Button text="9" onPress={() => handlePress("number", "9")} />
                    <Button
                        text="x"
                        theme="accent"
                        onPress={() => handlePress("operator", "*")}
                    />
                </Row>

                <Row>
                    <Button text="4" onPress={() => handlePress("number", 4)} />
                    <Button text="5" onPress={() => handlePress("number", 5)} />
                    <Button text="6" onPress={() => handlePress("number", 6)} />
                    <Button
                        text="-"
                        theme="accent"
                        onPress={() => handlePress("operator", "-")}
                    />
                </Row>

                <Row>
                    <Button text="1" onPress={() => handlePress("number", 1)} />
                    <Button text="2" onPress={() => handlePress("number", 2)} />
                    <Button text="3" onPress={() => handlePress("number", 3)} />
                    <Button
                        text="+"
                        theme="accent"
                        onPress={() => handlePress("operator", "+")}
                    />
                </Row>

                <Row>
                    <Button
                        text="0"
                        size="double"
                        onPress={() => handlePress("number", 0)}
                    />
                    <Button text="." onPress={() => handlePress("point")} />
                    <Button
                        text="="
                        theme="accent"
                        onPress={() => handlePress("equal")}
                    />
                </Row>
            </SafeAreaView>
        </View>
    );

}