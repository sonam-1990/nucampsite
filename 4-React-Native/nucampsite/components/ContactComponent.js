import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';


class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    }
    render() {
        return (
            <ScrollView wrapperStyle={{ margin: 20 }}>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Card title="Contact Information">

                        <Text style={{ marginBottom: 10 }}>
                            1 Nucamp Way{"\n"}
                            Seattle, WA 98001{"\n"}
                            U.S.A.
                        </Text>
                        <Text> Phone: 1-206-555-1234{"\n"}
                            Email: campsites@nucamp.co </Text>

                    </Card>
                </Animatable.View>

            </ScrollView>

        );
    }

}
export default Contact;