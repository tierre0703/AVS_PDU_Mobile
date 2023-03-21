import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

export const VirtualizedList = ({children, style}) => {
    return (
        <FlatList
            style={style}
            data={[]}
            keyExtractor={() => "key"}
            renderItem={null}
            ListHeaderComponent={
                <>{children}</>
            }
        />
    )
}
