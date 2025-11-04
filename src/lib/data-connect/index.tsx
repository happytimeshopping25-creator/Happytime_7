import { connectorConfig } from '@firebasegen/default-connector'
import { getDataConnect } from 'firebase/data-connect'
import app from '../firebase';

export const dc = getDataConnect(app, connectorConfig)
