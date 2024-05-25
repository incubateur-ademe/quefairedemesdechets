import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-query'
import axios from 'axios'

import UXContext from 'utils/UXContext'
import Panel from 'components/base/Panel'
import Button from 'components/base/Button'
import TextInput from 'components/base/TextInput'
import TextArea from 'components/base/TextArea'
import Select from 'components/base/Select'
import ContactPrompt from 'components/base/ContactPrompt'

const Form = styled.form`
  width: 100%;
  margin-bottom: 3rem;
`
const Title = styled.div`
  margin-bottom: 1rem;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.second};
  font-weight: bold;
  line-height: 1.2;

  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Warning = styled.p``
const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
`
const AlertIcon = styled.svg`
  margin: 1rem;
  width: 3rem;
  color: ${props => props.role === 'status' ? '#18753C' : '#ce0500'};
`
const Alert = styled.p`
  margin-top: 1rem;
  text-align: center;
`

export default function Contact(props) {
  const { contactOpen, setContactOpen } = useContext(UXContext)

  const [user, setUser] = useState({
    nom: '',
    email: '',
    objet: '',
    message: '',
  })

  const [empty, setEmpty] = useState(false)

  const mutation = useMutation((formData) => {
    return axios.post('/', formData)
  })

  return (
    <Panel
      small={props.small}
      open={contactOpen}
      toggleClose={() => {
        setContactOpen((prevOpen) => !prevOpen)
        mutation.reset()
      }}
      index={2}
    >
      <Title>Nous contacter</Title>
      {!mutation.isError && !mutation.isSuccess && (

        <Form
          id='contact'
          method='post'
          data-netlify='true'
          name='contact'
          onSubmit={(e) => {
            e.preventDefault()
            if (!user.nom || !user.email || !user.objet || !user.message) {
              mutation.reset()
              setEmpty(true)
            } else {
              setEmpty(false)
              const formData = new URLSearchParams()
              formData.append(
                'form-name',
                ['integration', 'autre'].includes(user.objet)
                  ? 'contact'
                  : 'bug'
              )
              Object.keys(user).map((key) => formData.append(key, user[key]))
              mutation.mutate(formData)
            }
          }}
        >
          <TextInput
            name={'nom'}
            value={user.nom}
            error={empty && !user.nom}
            label={'Votre nom'}
            onChange={({ name, value }) =>
              setUser((prevUser) => ({ ...prevUser, [name]: value }))
            }
            autocomplete='name'
            required
          />
          <TextInput
            type='email'
            name={'email'}
            error={empty && !user.email}
            value={user.email}
            label={'Votre email'}
            onChange={({ name, value }) =>
              setUser((prevUser) => ({ ...prevUser, [name]: value }))
            }
            autocomplete='email'
          />
          <Select
            name={'objet'}
            value={user.objet}
            label={'Votre sujet'}
            onChange={({ name, value }) =>
              setUser((prevUser) => ({ ...prevUser, [name]: value }))
            }
          >
            <option value={null} disabled></option>
            <option value='integration'>
              Je souhaite obtenir de l'aide pour intégrer le simulateur
            </option>
            {props.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            <option value='bug'>J'ai trouvé un bug</option>
            <option value='amelioration'>
              Je souhaite proposer une amélioration
            </option>
            <option value='autre'>Autre</option>
          </Select>
          {props.options.find((option) => option.value === user.objet) && (
            <Warning
              dangerouslySetInnerHTML={{
                __html: props.options.find(
                  (option) => option.value === user.objet
                ).disclaimer,
              }}
            />
          )}
          <TextArea
            name={'message'}
            value={user.message}
            error={empty && !user.message}
            label={'Votre message'}
            onChange={({ name, value }) =>
              setUser((prevUser) => ({ ...prevUser, [name]: value }))
            }
          />
          <ButtonWrapper>
            <Button submit disabled={mutation.isLoading}>
              Envoyer mon message
            </Button>
          </ButtonWrapper>
          {empty && <Alert role='alert'>Merci de remplir tous les champs</Alert>}
        </Form>
      )}
      {mutation.isError && (
        <AlertContainer>

        <AlertIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"></path>
        </AlertIcon>
          <Alert role='alert'>
            Quelque chose n'a pas fonctionné :(
            <br />({mutation.error.message})
          </Alert>
        </AlertContainer>
      )}
      {mutation.isSuccess && (
        <AlertContainer>
          <AlertIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
          </AlertIcon>
          <Alert role="status">
            Merci !<br />
            Nous avons bien reçu votre message
            
          </Alert>
        </AlertContainer>
      )}
      <ContactPrompt contact />
    </Panel>
  )
}
