import { render,screen,fireEvent,waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/store";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Sign_in from "../view/Sign_up";

describe('ComponentName', () => {
   beforeEach(()=>{
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
        <Provider store={store}>
        <BrowserRouter>
        <Sign_in/>
        </BrowserRouter>    
        </Provider>
    )
   })
   test("renders input field on signup page",()=>{
    const emailinput=screen.getByTestId("signup-name");
    expect(emailinput).toBeInTheDocument();
   })
    
  

  });
