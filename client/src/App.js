import React, { useState, useEffect } from 'react';
import { Container, Table, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { getToken } from './fetch/auth'
import { GetUsers, DeleteUsers, AddUsers, UpdateUsers } from './fetch/user'

const App = () => {
  const [userList, setUserData] = useState([]);

  const [updateUserId, setupdateUserId] = useState(0);
  const [UserFirstName, setUserFirstName] = useState("");
  const [UserLastName, setUserLastName] = useState("");
  const [UserCompany, setUserCompany] = useState("");
  const [UserPhone, setUserPhone] = useState("");

  const [SearchUserFirstName, setSearchUserFirstName] = useState("")
  const [SearchUserLastName, setSearchUserLastName] = useState("");
  const [SearchUserCompany, setSearchUserCompany] = useState("");
  const [SearchUserPhone, setSearchUserPhone] = useState("");

  useEffect(() => { getUserList(); }, []);

  const getUserList = async () => {
    await SetToken();

    let querystringList = [];
    if (SearchUserFirstName != "")
      querystringList.push("firstName=" + SearchUserFirstName)
    if (SearchUserLastName != "")
      querystringList.push("lastName=" + SearchUserLastName)
    if (SearchUserCompany != "")
      querystringList.push("company=" + SearchUserCompany)
    if (UserPhone != "")
      querystringList.push("phoneNumber=" + UserPhone)
    let querystring = "";
    if (querystringList.length > 0) {
      querystring = "?" + querystringList.join('&')
    }
    const userdata = await GetUsers(querystring);
    setUserData(userdata.data);
  };

  const deleteUser = async (id) => {
    await DeleteUsers(id);
    getUserList();
  };

  const addUser = async () => {
    const postdata = {
      firstName: UserFirstName,
      lastName: UserLastName,
      company: UserCompany,
      phoneNumber: (UserPhone ? UserPhone.split(',') : "")
    };
    if (updateUserId == 0) await AddUsers(postdata);
    else await UpdateUsers(postdata, updateUserId);
    getUserList();
    setUserFirstName("");
    setUserLastName("");
    setUserCompany("");
    setUserPhone("");
  };

  const updateUser = async (id) => {
    var user = userList.filter(x => x.id == id)[0];
    setupdateUserId(id);
    setUserFirstName(user.firstName);
    setUserLastName(user.lastName);
    setUserCompany(user.company);
    setUserPhone(JSON.parse(user.phoneNumber).join());
  };

  const SetToken = async () => {
    if (!localStorage.getItem("token")) {
      const tokendata = await getToken();
      localStorage.setItem("token", tokendata.data.token)
    }
  }

  return (
    <>
      <Container className="p-3">
        <Row>

          <Col className='col-3'>
            <h3> Yeni User</h3>
            <Row>
              <Form.Label htmlFor="searchname">İsim</Form.Label>
              <Form.Control
                type="text"
                id="searchname"
                className=' mb-2'
                placeholder=''
                value={UserFirstName}
                onChange={(event) => { setUserFirstName(event.target.value); }}
              />
              <Form.Label htmlFor="searchsurname">Soyisim</Form.Label>
              <Form.Control
                type="text"
                id="searchsurname"
                className=' mb-2'
                placeholder=''
                value={UserLastName}
                onChange={(event) => { setUserLastName(event.target.value); }}
              />
              <Form.Label htmlFor="searchcompany">Şirket</Form.Label>
              <Form.Control
                type="text"
                id="searchcompany"
                className=' mb-2'
                placeholder=''
                value={UserCompany}
                onChange={(event) => { setUserCompany(event.target.value); }}
              />
              <Form.Label htmlFor="searchphone">Telefon</Form.Label>
              <Form.Control
                type="text"
                id="searchphone"
                className=' mb-2'
                placeholder=''
                value={UserPhone}
                onChange={(event) => { setUserPhone(event.target.value); }}
              />

              <Button variant="outline-success" onClick={() => addUser()}>Yeni Kullanıcı Ekle</Button>
            </Row>
          </Col>
          <Col className='col-9' >
            <h3> Filtreler</h3>
            <Row>
              <Col className='col-3'>
                <Form.Label htmlFor="searchname">İsim</Form.Label>
                <Form.Control
                  type="text"
                  id="searchname"
                  className=' mb-2'
                  placeholder=''
                  value={SearchUserFirstName}
                  onChange={(event) => { setSearchUserFirstName(event.target.value); getUserList(); }}
                />
              </Col>
              <Col className='col-3'>
                <Form.Label htmlFor="searchname">Soyisim</Form.Label>
                <Form.Control
                  type="text"
                  id="searchname"
                  className=' mb-2'
                  placeholder=''
                  value={SearchUserLastName}
                  onChange={(event) => { setSearchUserLastName(event.target.value); getUserList(); }}
                />
              </Col>
              <Col className='col-3'>
                <Form.Label htmlFor="searchname">Şirket</Form.Label>
                <Form.Control
                  type="text"
                  id="searchname"
                  className=' mb-2'
                  placeholder=''
                  value={SearchUserCompany}
                  onChange={(event) => { setSearchUserCompany(event.target.value); getUserList(); }}
                />
              </Col>
              <Col className='col-3'>
                <Form.Label htmlFor="searchname">Telefon</Form.Label>
                <Form.Control
                  type="text"
                  id="searchname"
                  className=' mb-2'
                  placeholder=''
                  value={SearchUserPhone}
                  onChange={(event) => { setSearchUserPhone(event.target.value); getUserList(); }}
                />
              </Col>
            </Row>
            <Row className='p-3'>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>İsim</th>
                    <th>Soyisim</th>
                    <th>Şirket</th>
                    <th>Telefon</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userList.map(x => {
                      return <tr>
                        <td>{x.firstName}</td>
                        <td>{x.lastName}</td>
                        <td>{x.company}</td>
                        <td>{JSON.parse(x.phoneNumber).join()}</td>
                        <td>
                          <Button variant="outline-warning m-2" onClick={() => updateUser(x.id)} >Düzenle</Button>
                          <Button variant="outline-danger" onClick={() => deleteUser(x.id)} >Sil</Button>
                        </td>
                      </tr>
                    })
                  }


                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
