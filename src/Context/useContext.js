import React from 'react'
import { customContext } from './Context'

export const useContexts = () => React.useContext(customContext);
