import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';

const FabButton = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'plus' : 'plus'}
          actions={[
            {
              icon: 'star',
              label: 'Resiclar',
              onPress: () => console.log('Pressed star'),
            },
            {
              icon: 'email',
              label: 'Reforestar',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'bell',
              label: 'Desechos',
              onPress: () => console.log('Pressed notifications'),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};

export default FabButton;