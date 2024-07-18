"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button"

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

  const [mongoUri, setMongoUri] = useState("");
  const [mongoDatabase, setMongoDatabase] = useState("");
  const [postgreHost, setPostgreHost] = useState("");
  const [postgrePort, setPostgrePort] = useState("");
  const [postgreDatabase, setPostgreDatabase] = useState("");
  const [postgreUser, setPostgreUser] = useState("");
  const [postgrePassword, setPostgrePassword] = useState("");

  const handleSubmit = (tab) => {
    let valid = true;
    switch (tab) {
      case "MongoDB":
        if (!mongoUri || !mongoDatabase) {
          valid = false;
          alert("Please fill in all required fields for MongoDB.");
        }
        if (valid) {
          console.log("MongoDB URI:", mongoUri);
          console.log("MongoDB Database:", mongoDatabase);
        }
        break;
      case "PostgreSQL":
        if (!postgreHost || !postgrePort || !postgreDatabase || !postgreUser || !postgrePassword) {
          valid = false;
          alert("Please fill in all required fields for PostgreSQL.");
        }
        if (valid) {
          console.log("PostgreSQL Host:", postgreHost);
          console.log("PostgreSQL Port:", postgrePort);
          console.log("PostgreSQL Database:", postgreDatabase);
          console.log("PostgreSQL User:", postgreUser);
          console.log("PostgreSQL Password:", postgrePassword);
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
                    <Label htmlFor="uri">URI</Label>
                    <Input id="uri" placeholder="mongodb://localhost:27017" value={mongoUri} onChange={(e) => setMongoUri(e.target.value)} required/>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="mongo-database">DB</Label>
                    <Input id="mongo-database" placeholder="my-db" value={mongoDatabase} onChange={(e) => setMongoDatabase(e.target.value)} required/>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSubmit("MongoDB")}>Save & Test Connection</Button>
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
                  <Label htmlFor="host">Host</Label>
                  <Input id="host" placeholder="localhost" value={postgreHost} onChange={(e) => setPostgreHost(e.target.value)} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="port">Port</Label>
                  <Input id="port" placeholder="5432" value={postgrePort} onChange={(e) => setPostgrePort(e.target.value)} required/>
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
                  <p><strong>URI:</strong> {mongoUri}</p>
                  <p><strong>DB:</strong> {mongoDatabase}</p>
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
                <Button>Start Transformation</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
   
  );
}
