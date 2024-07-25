"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button"

import { Spinner } from "@/components/ui/spinner"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"

export default function Home() {

  const [mongoHost, setMongoHost] = useState("");
  const [mongoPort, setMongoPort] = useState("");
  const [mongoDatabase, setMongoDatabase] = useState("");
  const [mongoUser, setMongoUser] = useState("");
  const [mongoPassword, setMongoPassword] = useState("");

  const [postgreHost, setPostgreHost] = useState("");
  const [postgrePort, setPostgrePort] = useState("");
  const [postgreDatabase, setPostgreDatabase] = useState("");
  const [postgreUser, setPostgreUser] = useState("");
  const [postgrePassword, setPostgrePassword] = useState("");

  const [mongoMessage, setMongoMessage] = useState({text: "", success: false});
  const [postgreMessage, setPostgreMessage] = useState({text: "", success: false});

  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)

  const [schemaMessage, setSchemaMessage] = useState({text: "Creating schema on progress", success: false});
  const [etlMessage, setEtlMessage] = useState({text: "", success: false});

  const handleSubmit = async (tab) => {
    let valid = true;
    let response, result;
    switch (tab) {
      case "MongoDB":
        if (!mongoHost || !mongoPort || !mongoDatabase || !mongoUser || !mongoPassword) {
          valid = false;
          alert("Please fill in all required fields for MongoDB.");
        }
        if (valid) {
          try {
            response = await fetch("http://localhost:8000/mongo-test-connection", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ host: mongoHost, port: mongoPort, database: mongoDatabase, user: mongoUser, password: mongoPassword }),
            });
            result = await response.json();
            setMongoMessage({
              ...mongoMessage,
              text: result.message, 
              success: result.success});
          } catch (error) {
            setMongoMessage({
              ...mongoMessage,
              text: "Error connecting to MongoDB", 
              success: false});
          }
        }
        break;
      case "PostgreSQL":
        if (!postgreHost || !postgrePort || !postgreDatabase || !postgreUser || !postgrePassword) {
          valid = false;
          alert("Please fill in all required fields for PostgreSQL.");
        }
        if (valid) {
          try {
            response = await fetch("http://localhost:8000/postgre-test-connection", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ host: postgreHost, port: postgrePort, database: postgreDatabase, user: postgreUser, password: postgrePassword }),
            });
            result = await response.json();
            setPostgreMessage({
              ...postgreMessage,
              text: result.message, 
              success: result.success});
          } catch (error) {
            setPostgreMessage({
              ...postgreMessage,
              text: "connection failed", 
              success: false});
          }
        }
        break;
      case "TransformSchema":
        if (!mongoHost || !mongoPort || !mongoDatabase || !mongoUser || !mongoPassword || !postgreHost || !postgrePort || !postgreDatabase || !postgreUser || !postgrePassword) {
          valid = false;
          alert("Please fill in all required fields for PostgreSQL.");
        }
        if (valid) {
          try {
            response = await fetch("http://localhost:8000/generate-schema-from-mongo-to-postgres", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                mongo_host: mongoHost,
                mongo_port: mongoPort,
                mongo_database: mongoDatabase,
                mongo_user: mongoUser,
                mongo_password: mongoPassword, 
                postgre_host: postgreHost, 
                postgre_port: postgrePort, 
                postgre_database: postgreDatabase, 
                postgre_user: postgreUser, 
                postgre_password: postgrePassword
                
              }),
            });
            result = await response.json();
            setSchemaMessage({
              ...schemaMessage,
              text: result.message, 
              success: result.success});
          } catch (error) {
            setSchemaMessage({
              ...schemaMessage,
              text: "Schema transformation failed", 
              success: false});
          }
        }
        break;
      default:
        break;
    }
  };

  return (

    <div className="w-full h-screen flex justify-center mt-40">
      <div>
        <Tabs defaultValue="MongoDB" className="w-[400px]">
          <TabsList className="w-full">
            <TabsTrigger value="MongoDB">MongoDB</TabsTrigger>
            <TabsTrigger value="PostgreSQL">PostgreSQL</TabsTrigger>
            <TabsTrigger value="Evaluate">Evaluate</TabsTrigger>
          </TabsList>

          <TabsContent value="MongoDB" className="h-80">
            <Card>
                <CardHeader>
                  <CardTitle>MongoDB</CardTitle>
                  <CardDescription>
                    Configuration for MongoDB Source
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="mongo-host">Host</Label>
                    <Input id="mongo-host" placeholder="localhost" value={mongoHost} onChange={(e) => setMongoHost(e.target.value)} required/>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="mongo-port">Port</Label>
                    <Input id="mongo-port" placeholder="27017" value={mongoPort} onChange={(e) => setMongoPort(e.target.value)} required/>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="mongo-database">DB</Label>
                    <Input id="mongo-database" placeholder="my-db" value={mongoDatabase} onChange={(e) => setMongoDatabase(e.target.value)} required/>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="mongo-user">Username</Label>
                    <Input id="mongo-user" placeholder="admin" value={mongoUser} onChange={(e) => setMongoUser(e.target.value)} required/>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="mongo-password">Password</Label>
                    <Input id="mongo-password" type="password" placeholder="******" value={mongoPassword} onChange={(e) => setMongoPassword(e.target.value)} required/>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSubmit("MongoDB")}>Save & Test Connection</Button>
                  {mongoMessage.text && <div className={mongoMessage.success ? "text-green-500 text-sm font-semibold ml-2" : "text-red-500 text-sm font-semibold ml-2"}>{mongoMessage.text}</div>}
                </CardFooter>
              </Card>
            </TabsContent>
          
          <TabsContent value="PostgreSQL" className="h-80">
            <Card>
              <CardHeader>
                <CardTitle>PostgreSQL</CardTitle>
                <CardDescription>
                  Configuration for PostgreSQL Destination
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="postgre-host">Host</Label>
                  <Input id="postgre-host" placeholder="localhost" value={postgreHost} onChange={(e) => setPostgreHost(e.target.value)} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="postgre-port">Port</Label>
                  <Input id="postgre-port" placeholder="5432" value={postgrePort} onChange={(e) => setPostgrePort(e.target.value)} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="postgre-database">DB</Label>
                  <Input id="postgre-database" placeholder="my-db" value={postgreDatabase} onChange={(e) => setPostgreDatabase(e.target.value)} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="postgre-user">Username</Label>
                  <Input id="postgre-user" placeholder="admin" value={postgreUser} onChange={(e) => setPostgreUser(e.target.value)} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="postgre-password">Password</Label>
                  <Input id="postgre-password" type="password" placeholder="******" value={postgrePassword} onChange={(e) => setPostgrePassword(e.target.value)} required/>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSubmit("PostgreSQL")}>Save & Test Connection</Button>
                {postgreMessage.text && <div className={postgreMessage.success ? "text-green-500 text-sm font-semibold ml-2" : "text-red-500 text-sm font-semibold ml-2"}>{postgreMessage.text}</div>}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="Evaluate" className="h-80">
            <Card>
              <CardHeader>
                <CardTitle>Evaluate</CardTitle>
                <CardDescription>
                  Evaluate Your Configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
              <div className="space-y-1">
                  <Label className="text-lg">MongoDB Configuration</Label>
                  <p><strong>Host:</strong> {mongoHost}</p>
                  <p><strong>Port:</strong> {mongoPort}</p>
                  <p><strong>DB:</strong> {mongoDatabase}</p>
                  <p><strong>Username:</strong> {mongoUser}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-lg">PostgreSQL Configuration</Label>
                  <p><strong>Host:</strong> {postgreHost}</p>
                  <p><strong>Port:</strong> {postgrePort}</p>
                  <p><strong>DB:</strong> {postgreDatabase}</p>
                  <p><strong>Username:</strong> {postgreUser}</p>
                </div>
              </CardContent>
              <CardFooter>
                <div>
                  <Button onClick={() => {
                    handleSubmit("TransformSchema");
                    setShow((pre) => !pre);
                  }}>
                    Start Transformation
                  </Button>
                  <Spinner className="my-2" color='yellow' size="small" show={show}>
                    {schemaMessage.text && <div className={schemaMessage.success ? "text-green-1000 text-sm font-semibold ml-2" : "text-yellow-500 text-sm font-semibold ml-2"}>{schemaMessage.text}</div>}
                  </Spinner>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
   
  );
}
