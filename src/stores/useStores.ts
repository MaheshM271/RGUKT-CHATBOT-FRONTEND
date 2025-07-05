
import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import {  RootStore } from './';

export default function useStores() {
  return React.useContext(MobXProviderContext) as RootStore;
}