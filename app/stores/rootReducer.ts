/* Instruments */
import {createReducer} from '@/fe-base/reducers/rootReducer';

import authSlice from '@/fe-module-auth/reducers';
import appSlice from '@/fe-core/reducers/app';
import uiSlice from '@/app/reducers/ui';
import citySlice from '@/app/reducers/city';

const appReducer = createReducer({
    app: appSlice,
    auth: authSlice,
    ui: uiSlice,
    city: citySlice
});

export const reducer = (state: any, action: any) => appReducer(state, action);