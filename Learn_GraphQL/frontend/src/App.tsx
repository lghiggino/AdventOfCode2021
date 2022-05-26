import { gql, useMutation, useQuery } from '@apollo/client'
import { FormEvent, useEffect } from 'react'
import './App.css'
import { NewUserForm } from './components/NewUserForm'

export const GET_USER = gql`
  query {
    users {
    id,
    name,
    email
    }
  }
`

const DELETE_USER = gql`
  mutation($id: String!) {
  deleteUser(id: $id) {
    id,
    name
  }
}
`

type User = {
  name: string
  id: string
  email: string
}

function App() {
  const { loading, error, data } = useQuery<{ users: User[] }>(GET_USER)
  console.log("data", data)
  console.log("error", error)
  const [deleteUser, { data: deleteData, error: deleteError, loading: deleteLoading }] = useMutation(DELETE_USER)

  async function handleUserDeletion(id: string) {
    console.log("deletedId",id)
    await deleteUser({
      variables: {
        id
      }
    })
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <div>
        <NewUserForm />
      </div>
      <ul>
        {data?.users.map((user): any => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleUserDeletion(user.id)}>
              Apagar
            </button>
          </li>
        ))}
      </ul>
      {/* <UserFilter /> */}
    </div>
  )
}

export default App
