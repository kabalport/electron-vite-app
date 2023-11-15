import MainPage from "./components/Page/MainPage";

function App(): JSX.Element {
  return <>
    <MainPage />
    {/*<Router>*/}
    {/*  <Switch>*/}
    {/*    /!**/}
    {/*            저희가 정의해놓은 라우트를 여기서 실제 라우트 컴포넌트로 전환합니다.*/}
    {/*            왼쪽으 사이드바는 어떤 라우트던 고정으로 사용되고*/}
    {/*            item.component 부분만 src/route/index.tsx에서 지정해놓은*/}
    {/*            컴포넌트로 다이나믹하게 렌더링을 합니다.*/}
    {/*            *!/*/}
    {/*    /!* eslint-disable-next-line @typescript-eslint/no-unused-vars *!/*/}
    {/*    {indexRoutes.map((item, key) => {*/}
    {/*      return (*/}
    {/*        <Route path={item.route} exact={item.exact}>*/}
    {/*          <Grid container className={classes.root}>*/}
    {/*            <Grid item xs={2} className={classes.drawer}>*/}
    {/*              <Sidebar />*/}
    {/*            </Grid>*/}
    {/*            <Grid item xs={10}>*/}
    {/*              {item.component}*/}
    {/*            </Grid>*/}
    {/*          </Grid>*/}
    {/*        </Route>*/}
    {/*      )*/}
    {/*    })}*/}
    {/*  </Switch>*/}
    {/*</Router>*/}
  </>
}

export default App
