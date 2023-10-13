import React, { useState, useRef, useCallback, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  CustomRule,
  EmailRule
} from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import LoadIndicator from 'devextreme-react/load-indicator';
import { createAccount } from '../../api/auth';

import './CreateAccountForm.scss';

export default function CreateAccountForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formData = useRef({ email: '', password: '', lastName: '',  firstName: ''});

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { email, password, lastName, firstName } = formData.current;
    console.log(email, password, lastName, firstName);
    setLoading(true);

    const result = await createAccount(email, password, lastName, firstName);
    setLoading(false);

    if (result.isOk) {
      navigate('/login');
    } else {
      notify(result.message, 'error', 2000);
    }
  }, [navigate]);

  const confirmPassword = useCallback(
    ({ value }) => value === formData.current.password,
    []
  );

  return (
    <Fragment>
    <form className={'create-account-form'} onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
        <Item
          dataField={'email'}
          editorType={'dxTextBox'}
          editorOptions={emailEditorOptions}
        >
          <RequiredRule message="Email is required" />
          <EmailRule message="Email is invalid" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={'lastName'}
          editorType={'dxTextBox'}
          editorOptions={lastNameOptions}
          
        >
          <RequiredRule message="Vezetéknév kötelező" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={'firstName'}
          editorType={'dxTextBox'}
          editorOptions={firstNameOptions}
          
        >
          <RequiredRule message="Keresztnév kötelező" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={'password'}
          editorType={'dxTextBox'}
          editorOptions={passwordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={'confirmedPassword'}
          editorType={'dxTextBox'}
          editorOptions={confirmedPasswordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <CustomRule
            message={'Passwords do not match'}
            validationCallback={confirmPassword}
          />
          <Label visible={false} />
        </Item>
        <Item>
          <div className='policy-info'>
            By creating an account, you agree to the <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Policy</Link>
          </div>
        </Item>
        <ButtonItem>
          <ButtonOptions
            width={'100%'}
            type={'default'}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {
                loading
                  ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                  : 'Create a new account'
              }
            </span>
          </ButtonOptions>
        </ButtonItem>
        <Item>
          <div className={'login-link'}>
            Have an account? <Link to={'/login'}>Sign In</Link>
          </div>
        </Item>
      </Form>
    </form>
    </Fragment>
  );
}

const emailEditorOptions = { stylingMode: 'filled', placeholder: 'Email', mode: 'email' };
const passwordEditorOptions = { stylingMode: 'filled', placeholder: 'Jelszó', mode: 'password' };
const confirmedPasswordEditorOptions = { stylingMode: 'filled', placeholder: 'Jelszó megerősítése', mode: 'password' };
const lastNameOptions = { stylingMode: 'filled', placeholder: 'Vezetéknév'};
const firstNameOptions = { stylingMode: 'filled', placeholder: 'Kersztnév'};
