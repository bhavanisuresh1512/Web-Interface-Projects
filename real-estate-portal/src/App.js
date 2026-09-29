import './App.css';
import { Footer, Header, Toast } from './components';
import { AgentPage, AgentsPage, AuthPage, ComparePage, DashboardPage, DetailPage, ExplorePage, FavoritesPage, HomePage, InquiriesPage, NotFoundPage, PropertiesPage, SellPage, SellerPropertiesPage, SettingsPage } from './pages';
import { NavigationContext, useNavigation } from './navigation';
import { AppProvider } from './store';

function App() {
  const { path, navigate } = useNavigation();
  const route = path.split('?')[0];
  let page;
  let minimalShell = false;

  if (route === '/') page = <HomePage navigate={navigate}/>;
  else if (route === '/properties') page = <PropertiesPage path={path}/>;
  else if (route === '/explore') page = <ExplorePage path={path}/>;
  else if (route === '/favorites') page = <FavoritesPage/>;
  else if (route === '/compare') page = <ComparePage/>;
  else if (route === '/agents') page = <AgentsPage/>;
  else if (route.startsWith('/agents/')) page = <AgentPage id={route.split('/')[2]}/>;
  else if (route.startsWith('/property/')) page = <DetailPage id={route.split('/')[2]}/>;
  else if (route === '/login' || route === '/register') { page = <AuthPage mode={route.slice(1)} navigate={navigate}/>; minimalShell = true; }
  else if (route === '/dashboard') page = <DashboardPage/>;
  else if (route === '/dashboard/properties') page = <SellerPropertiesPage navigate={navigate}/>;
  else if (route === '/dashboard/inquiries') page = <InquiriesPage/>;
  else if (route === '/dashboard/settings') page = <SettingsPage/>;
  else if (route === '/sell') page = <SellPage navigate={navigate}/>;
  else page = <NotFoundPage/>;

  return (
    <AppProvider>
      <NavigationContext.Provider value={navigate}>
        <div className="app-shell">
          {!minimalShell && <Header/>}
          {page}
          {!minimalShell && <Footer/>}
          <Toast/>
        </div>
      </NavigationContext.Provider>
    </AppProvider>
  );
}

export default App;
