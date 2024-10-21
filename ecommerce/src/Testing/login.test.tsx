import { render,screen,fireEvent,waitFor } from "@testing-library/react";
import Login from "../view/Login";
import { Provider } from "react-redux";
import store from "../store/store";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe('ComponentName', () => {
   beforeEach(()=>{
    render(
        <Provider store={store}>
        <BrowserRouter>
        <Login/>
        </BrowserRouter>    
        </Provider>
    )
   })
   test("renders input field",()=>{
    const emailinput=screen.getByTestId("login-email");
    expect(emailinput).toBeInTheDocument();
   })
   test("renders login button",()=>{
    const loginbutton=screen.getByTestId("login-btn");
    expect(loginbutton).toBeInTheDocument();
   })

   test('calls handleClick on button click', () => {

    const handleClick = jest.fn();
    const button = screen.getByTestId('login-btn'); 
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
    
  test("navigate to login page",async()=>{

    const inputField1 = screen.getByTestId('login-email');
    const inputField2 = screen.getByTestId('login-pass');


    fireEvent.change(inputField1, { target: { value:'gautam12@gmail.com' } });
    fireEvent.change(inputField2, { target: { value:'666666' } });
    
    const loginbutton=screen.getByTestId('login-btn');
    await fireEvent.click(loginbutton);

  expect(window.location.pathname).toBe('/')
    
})

  });
