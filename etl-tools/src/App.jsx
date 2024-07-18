import React from 'react';
import './App.css';

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

function App() {
  const [type, setType] = React.useState("mongodb");
  const [mongoConfig, setMongoConfig] = React.useState({
    host: "",
    port: "",
    database: "",
    username: "",
    password: "",
  });
  const [postgresConfig, setPostgresConfig] = React.useState({
    host: "",
    port: "",
    database: "",
    username: "",
    password: "",
  });

  const handleMongoChange = (e) => {
    setMongoConfig({ ...mongoConfig, [e.target.name]: e.target.value });
  };

  const handlePostgresChange = (e) => {
    setPostgresConfig({ ...postgresConfig, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "mongodb") {
      console.log("MongoDB Config: ", mongoConfig);
    } else {
      console.log("PostgreSQL Config: ", postgresConfig);
    }
  };

  return (
    <Card className="w-full max-w-[24rem]">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center px-4 py-8 text-center"
      >
        <Typography variant="h5" color="white">
          Database Configuration
        </Typography>
      </CardHeader>
      <CardBody>
        <Tabs value={type} className="overflow-visible">
          <TabsHeader className="relative z-0 ">
            <Tab value="mongodb" onClick={() => setType("mongodb")}>
              MongoDB
            </Tab>
            <Tab value="postgres" onClick={() => setType("postgres")}>
              PostgreSQL
            </Tab>
          </TabsHeader>
          <TabsBody
            className="!overflow-x-hidden !overflow-y-visible"
            animate={{
              initial: {
                x: type === "mongodb" ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: type === "mongodb" ? 400 : -400,
              },
            }}
          >
            <TabPanel value="mongodb" className="p-0">
              <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit}>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Host
                </Typography>
                <Input
                  name="host"
                  value={mongoConfig.host}
                  onChange={handleMongoChange}
                  placeholder="localhost"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Port
                </Typography>
                <Input
                  name="port"
                  value={mongoConfig.port}
                  onChange={handleMongoChange}
                  placeholder="27017"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Database
                </Typography>
                <Input
                  name="database"
                  value={mongoConfig.database}
                  onChange={handleMongoChange}
                  placeholder="mydatabase"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Username
                </Typography>
                <Input
                  name="username"
                  value={mongoConfig.username}
                  onChange={handleMongoChange}
                  placeholder="username"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Password
                </Typography>
                <Input
                  name="password"
                  type="password"
                  value={mongoConfig.password}
                  onChange={handleMongoChange}
                  placeholder="password"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <Button size="lg" type="submit">Save MongoDB Config</Button>
              </form>
            </TabPanel>
            <TabPanel value="postgres" className="p-0">
              <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit}>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Host
                </Typography>
                <Input
                  name="host"
                  value={postgresConfig.host}
                  onChange={handlePostgresChange}
                  placeholder="localhost"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Port
                </Typography>
                <Input
                  name="port"
                  value={postgresConfig.port}
                  onChange={handlePostgresChange}
                  placeholder="5432"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Database
                </Typography>
                <Input
                  name="database"
                  value={postgresConfig.database}
                  onChange={handlePostgresChange}
                  placeholder="mydatabase"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Username
                </Typography>
                <Input
                  name="username"
                  value={postgresConfig.username}
                  onChange={handlePostgresChange}
                  placeholder="username"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Password
                </Typography>
                <Input
                  name="password"
                  type="password"
                  value={postgresConfig.password}
                  onChange={handlePostgresChange}
                  placeholder="password"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <Button size="lg" type="submit">Save PostgreSQL Config</Button>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}

export default App;