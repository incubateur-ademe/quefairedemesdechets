import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { QueryClient, QueryClientProvider } from 'react-query'

import { GlobalStyle } from 'utils/styles'
import StyleProvider from 'components/providers/StyleProvider'
import ModalProvider from 'components/providers/ModalProvider'
import UXProvider from 'components/providers/UXProvider'
import WasteProvider from 'components/providers/WasteProvider'
import SearchProvider from 'components/providers/SearchProvider'
import CO2EModal from 'components/modals/CO2EModal'
import Web from 'components/layout/Web'
import Iframe from 'components/layout/Iframe'
import SuggestionsWrapper from 'views/SuggestionsWrapper'
import Product from 'views/Product'

const queryClient = new QueryClient()

function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <QueryClientProvider client={queryClient}>
          <UXProvider>
            <StyleProvider>
              <WasteProvider>
                <SearchProvider>
                  <ModalProvider>
                    <GlobalStyle />
                    <Switch>
                      <Route path='/embed'>
                        <Iframe>Iframe</Iframe>
                      </Route>
                      <Route>
                        <Web>
                          <Switch>
                            <Route path='/dechet/:name'>
                              <Product />
                            </Route>
                            <Route path='/'>
                              <SuggestionsWrapper />
                            </Route>
                          </Switch>
                        </Web>
                      </Route>
                    </Switch>
                    <CO2EModal />
                  </ModalProvider>
                </SearchProvider>
              </WasteProvider>
            </StyleProvider>
          </UXProvider>
        </QueryClientProvider>
      </QueryParamProvider>
    </Router>
  )
}

export default App
