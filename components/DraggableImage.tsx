import React, { useState, useEffect, useRef } from 'react';
import { Image, View } from 'react-native';
import Draggable from 'react-native-draggable';

export default function DraggableImage(props: any) {
    const [imageDimenssion, setDimenssions] = useState(100);

    if (!props.visible) {
        return <View />
    }

    return (
        <Draggable
            x={200}
            y={400}
            onLongPress={() => { props.deleteItem(); }}
            onPressIn={() => setDimenssions(imageDimenssion + 10)}
            children={
                <Image style={{ width: imageDimenssion, height: imageDimenssion }} source={props.source} />
            }
        />
    )
}