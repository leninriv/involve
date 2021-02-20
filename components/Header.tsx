import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { colors } from '../utils/colors';

export default function Header(props: any) {
    const _goBack = () => {props.goBack()};

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    return (
        <Appbar.Header style={{backgroundColor: colors.gray}}>
            {!!props.showBack && <Appbar.BackAction onPress={_goBack} />}
            <Appbar.Content title={props.title} subtitle="" />
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
    );
};
