"use client";

import { useState } from "react";
import * as React from "react"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import Image from 'next/image';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Separator } from "@/components/ui/separator"

import { Spinner } from '@/components/ui/spinner';

import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"

import { Textarea } from "@/components/ui/textarea"
import { CheckCheckIcon, CheckIcon, Circle, CrossIcon, XIcon } from "lucide-react";

export default function Home() {

  const [mongoHost, setMongoHost] = useState("");
  const [mongoPort, setMongoPort] = useState("");
  const [mongoDatabase, setMongoDatabase] = useState("");
  const [mongoUser, setMongoUser] = useState("");
  const [mongoPassword, setMongoPassword] = useState("");
  const [mongoSchema, setMongoSchema] = useState("");
  const [mongoMessage, setMongoMessage] = useState({text: "", success: false});

  const [rdbmsType, setRdbmsType] = useState("")
  const [rdbmsHost, setRdbmsHost] = useState("");
  const [rdbmsPort, setRdbmsPort] = useState("");
  const [rdbmsDatabase, setRdbmsDatabase] = useState("");
  const [rdbmsUser, setRdbmsUser] = useState("");
  const [rdbmsPassword, setRdbmsPassword] = useState("");
  const [rdbmsSchema, setRdbmsSchema] = useState("");
  const [rdbmsMessage, setRdbmsMessage] = useState({text: "", success: false});

  const [isSchemaPreview, setSchemaPreview] = useState(false);
  const [isMigrating, setMigrating] = useState(false);

  const [showSchemaPending, setShowSchemaPending] = useState(true)
  const [pendingSchemaMessage, setPendingSchemaMessage] = useState({text: "Schema creation has not started yet", success: false});
  
  const [showSchemaLoading, setShowSchemaLoading] = useState(false)
  const [loadingSchemaMessage, setLoadingSchemaMessage] = useState({text: "Schema creation is currently in progress...", success: false});

  const [showSchemaSuccess, setShowSchemaSuccess] = useState(false)
  const [successSchemaMessage, setSuccessSchemaMessage] = useState({text: "The schema was created successfully", success: false});

  const [showSchemaFailed, setShowSchemaFailed] = useState(false)
  const [failedSchemaMessage, setFailedSchemaMessage] = useState({text: "Failed to create schema", success: false});

  const [showEtlPending, setShowEtlPending] = useState(true)
  const [pendingEtlMessage, setPendingEtlMessage] = useState({text: "Data loading has not started yet", success: false});
  
  const [showEtlLoading, setShowEtlLoading] = useState(false)
  const [loadingEtlMessage, setLoadingEtlMessage] = useState({text: "Data loading is currently in progress...", success: false});

  const [showEtlSuccess, setShowEtlSuccess] = useState(false)
  const [successEtlMessage, setSuccessEtlMessage] = useState({text: "Data was loaded successfully", success: false});

  const [showEtlFailed, setShowEtlFailed] = useState(false)
  const [failedEtlMessage, setFailedEtlMessage] = useState({text: "Failed to load data", success: false});

  const handleRdbmsTypeChange = (value: string) => {
    setRdbmsType(value);
  };

  const handleSubmit = async (tab: string) => {
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
            response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}mongodb/test-connection`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ host: mongoHost, port: mongoPort, db: mongoDatabase, username: mongoUser, password: mongoPassword }),
            });
            result = await response.json();
            setMongoMessage({
              ...mongoMessage,
              text: result.message, 
              success: result.status});

            setTimeout(() => {
              setMongoMessage({
                ...mongoMessage,
                text: "",
                success: false
              });
            }, 500);

          } catch (error) {
            setMongoMessage({
              ...mongoMessage,
              text: "Error connecting to MongoDB", 
              success: false});

            setTimeout(() => {
              setMongoMessage({
                ...mongoMessage,
                text: "",
                success: false
              });
            }, 500);
          }
        }
        break;
      case "RDBMS":
        if (!rdbmsType || !rdbmsHost || !rdbmsPort || !rdbmsDatabase || !rdbmsUser || !rdbmsPassword) {
          valid = false;
          alert("Please fill in all required fields for RDBMS.");
        }
        if (valid) {
          try {
            response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}rdbms/test-connection?rdbms_type=${rdbmsType}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ host: rdbmsHost, port: rdbmsPort, db: rdbmsDatabase, username: rdbmsUser, password: rdbmsPassword }),
            });
            result = await response.json();
            setRdbmsMessage({
              ...rdbmsMessage,
              text: result.message, 
              success: result.status});

            setTimeout(() => {
              setRdbmsMessage({
                ...rdbmsMessage,
                text: "",
                success: false
              });
            }, 500);

          } catch (error) {
            setRdbmsMessage({
              ...rdbmsMessage,
              text: "connection failed", 
              success: false});
            
            setTimeout(() => {
              setRdbmsMessage({
                ...rdbmsMessage,
                text: "",
                success: false
              });
            }, 500);

          }
        }
        break;
      default:
        break;
    }
  };

  const getRdbmsSchema = async () => {
    let response, result;

    if (!mongoHost || !mongoPort || !mongoDatabase || !mongoUser || !mongoPassword) {
      alert("Please fill in all required fields for MongoDB.");
      return;
    }

    if (!rdbmsType || !rdbmsHost || !rdbmsPort || !rdbmsDatabase || !rdbmsUser || !rdbmsPassword) {
      alert("Please fill in all required fields for RDBMS.");
      return;
    }

    try {
      response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}rdbms/display-schema?rdbms_type=${rdbmsType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "rdbms":{
            host: rdbmsHost,
            port: rdbmsPort,
            db: rdbmsDatabase,
            username: rdbmsUser,
            password: rdbmsPassword,
          },
          "mongodb":{
            host: mongoHost,
            port: mongoPort,
            db: mongoDatabase,
            username: mongoUser,
            password: mongoPassword,
          }
        }),
      });
  
      if (!response.ok) {
        console.error("Failed to fetch MongoDB schema:", response.statusText);
        return;
      }

      result = await response.json();
      setRdbmsSchema(result);
    } catch (error) {
      console.error("Error fetching MongoDB schema:", error);
    }
  };

  const implementRdbmsSchema = async () => {
    let response, result;
  
    setTimeout(() => {
      setShowSchemaPending(false);
    }, 500);

    setTimeout(() => {
      setShowSchemaLoading(true);
    }, 500);
    

    if (!mongoHost || !mongoPort || !mongoDatabase || !mongoUser || !mongoPassword) {
      alert("Please fill in all required fields for MongoDB.");
      return;
    }

    if (!rdbmsType || !rdbmsHost || !rdbmsPort || !rdbmsDatabase || !rdbmsUser || !rdbmsPassword) {
      alert("Please fill in all required fields for RDBMS.");
      return;
    }

    try {
      response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}rdbms/implement-schema?rdbms_type=${rdbmsType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "rdbms":{
            host: rdbmsHost,
            port: rdbmsPort,
            db: rdbmsDatabase,
            username: rdbmsUser,
            password: rdbmsPassword,
          },
          "mongodb":{
            host: mongoHost,
            port: mongoPort,
            db: mongoDatabase,
            username: mongoUser,
            password: mongoPassword,
          }
        }),
      });
  
      if (!response.ok) {
        console.error("Failed to fetch MongoDB schema:", response.statusText);
        return;
      }

      result = await response.json();

      setTimeout(() => {
        setShowSchemaLoading(false);
      }, 500);

      setTimeout(() => {
        setShowSchemaSuccess(true);
      }, 500);

    } catch (error) {
      console.error("Error fetching MongoDB schema:", error);

      setTimeout(() => {
        setShowSchemaFailed(true);
      }, 500);

    }
  };

  const getMongoSchema = async () => {
    let response, result;

    if (!mongoHost || !mongoPort || !mongoDatabase || !mongoUser || !mongoPassword) {
      alert("Please fill in all required fields for MongoDB.");
      return;
    }

    try {
      response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}mongodb/display-schema`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          host: mongoHost,
          port: mongoPort,
          db: mongoDatabase,
          username: mongoUser,
          password: mongoPassword,
        }),
      });
  
      if (!response.ok) {
        console.error("Failed to fetch MongoDB schema:", response.statusText);
        return;
      }
      result = await response.json();
      setMongoSchema(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("Error fetching MongoDB schema:", error);
    }
  };

  return (

    <div className="w-full h-screen flex justify-center mt-40">
      <div>
        <Tabs defaultValue="MongoDB" className="w-[400px]">
          
          <TabsList className="w-full">
            <TabsTrigger value="MongoDB">MongoDB</TabsTrigger>
            <TabsTrigger value="RDBMS">RDBMS</TabsTrigger>
            <TabsTrigger value="Evaluate">Evaluate</TabsTrigger>
          </TabsList>

          <TabsContent value="MongoDB" className="h-80">
            <Card >
              <CardHeader className="py-3 px-6">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Image
                    src="/assets/mongodb-logo.png"
                    alt="MongoDB"
                    width={40}
                    height={40}
                    style={{ marginRight: '8px' }}
                  />
                  <CardTitle>MongoDB</CardTitle>
                </div>
                <CardDescription>
                  Configuration for MongoDB Source
                </CardDescription>
              </CardHeader>
              <div className="mx-6 mb-2">
                <Separator />
              </div>
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
                {mongoMessage.text && <div className={mongoMessage.success ? "text-green-600 text-sm font-semibold ml-2" : "text-red-600 text-sm font-semibold ml-2"}>{mongoMessage.text}</div>}
              </CardFooter>
              
            </Card> 
          </TabsContent>
          
          <TabsContent value="RDBMS" className="h-80">
            <Card>
              <CardHeader className="py-3 px-6">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Image
                    src="/assets/rdbms-logo.png"
                    alt="RDBMS"
                    width={40}
                    height={40}
                    style={{ marginRight: '8px' }}
                  />
                  <CardTitle>RDBMS</CardTitle>
                </div>
                <CardDescription>
                  Configuration for RDBMS Destination
                </CardDescription>
              </CardHeader>
              <div className="mx-6 mb-2">
                <Separator />
              </div>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="rdbms-type">Type</Label>
                  <Select value={rdbmsType} onValueChange={handleRdbmsTypeChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select your RDBMS"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="mysql">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Image
                              src="/assets/logo-mysql.png"
                              alt="MySQL"
                              width={20}
                              height={20}
                              style={{ marginRight: '8px' }}
                            />
                            MySQL
                          </div>
                          </SelectItem>
                        <SelectItem value="postgresql">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Image
                                src="/assets/postgre.png"
                                alt="PostgreSQL"
                                width={20}
                                height={20}
                                style={{ marginRight: '8px' }}
                              />
                              PostgreSQL
                            </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="rdbms-host">Host</Label>
                  <Input id="rdbms-host" placeholder="localhost" value={rdbmsHost} onChange={(e) => setRdbmsHost(e.target.value)} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="rdbms-port">Port</Label>
                  <Input id="rdbms-port" placeholder="5432" value={rdbmsPort} onChange={(e) => setRdbmsPort(e.target.value)} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="postgre-database">DB</Label>
                  <Input id="rdbms-database" placeholder="my-db" value={rdbmsDatabase} onChange={(e) => setRdbmsDatabase(e.target.value)} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="rdbms-user">Username</Label>
                  <Input id="rdbms-user" placeholder="admin" value={rdbmsUser} onChange={(e) => setRdbmsUser(e.target.value)} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="rdbms-password">Password</Label>
                  <Input id="rdbms-password" type="password" placeholder="******" value={rdbmsPassword} onChange={(e) => setRdbmsPassword(e.target.value)} required/>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSubmit("RDBMS")}>Save & Test Connection</Button>
                {rdbmsMessage.text && <div className={rdbmsMessage.success ? "text-green-600 text-sm font-semibold ml-2" : "text-red-600 text-sm font-semibold ml-2"}>{rdbmsMessage.text}</div>}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="Evaluate" className="h-80">
            <Card>
              <CardHeader className="py-3 px-6">
                <CardTitle>Evaluate</CardTitle>
                <CardDescription>
                  Evaluate Your Configuration
                </CardDescription>
              </CardHeader>
              <div className="mx-6 mb-2">
                <Separator />
              </div>
              <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label className="text-lg">MongoDB Configuration</Label>
                <p><strong>Host:</strong> {mongoHost}</p>
                <p><strong>Port:</strong> {mongoPort}</p>
                <p><strong>DB:</strong> {mongoDatabase}</p>
                <p><strong>Username:</strong> {mongoUser}</p>
              </div>
              <div>
                <Separator />
              </div>
              <div className="space-y-1">
                <Label className="text-lg">RDBMS Configuration</Label>
                <p><strong>Type:</strong> {rdbmsType}</p>
                <p><strong>Host:</strong> {rdbmsHost}</p>
                <p><strong>Port:</strong> {rdbmsPort}</p>
                <p><strong>DB:</strong> {rdbmsDatabase}</p>
                <p><strong>Username:</strong> {rdbmsUser}</p>
              </div>
              </CardContent>
              <CardFooter>
                <div>
                  <Button onClick={() => {
                    setSchemaPreview(true);
                    getMongoSchema();
                    getRdbmsSchema();
                  }}>
                    Start Transformation
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isSchemaPreview} onOpenChange={setSchemaPreview}>
          <DialogContent
            className="sm:max-w-[950px]"
            onEscapeKeyDown={(event) => event.preventDefault()}
            onPointerDownOutside={(event) => event.preventDefault()}
            >
            <DialogHeader>
              <DialogTitle>Data Transformation</DialogTitle>
            </DialogHeader>

            <div className="flex py-4">
              <div className="flex-1 pr-4">
                <Label htmlFor="name" className="text-right">
                  MongoDB Source Schema
                </Label>
                <div className="py-2">
                  <Textarea
                    value={mongoSchema}
                    onChange={(e) => setMongoSchema(e.target.value)}
                    readOnly
                    style={{
                      height: "250px",
                      fontFamily: "Consolas, monospace",
                      fontSize: "14px",
                      backgroundColor: "#f4f4f4",
                      color: "#333",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      padding: "10px",
                      whiteSpace: "pre-wrap",
                      overflowX: "auto"
                    }}
                    placeholder="Generating schema..."
                  />
                </div>
              </div>

              <div className="border-l border-gray-300 mx-4" style={{ height: 'auto' }}></div>

              <div className="flex-1 pl-4">
                <Label htmlFor="email" className="text-right">
                  RDBMS Schema Transformation Results
                </Label>
                <div className="py-2">
                  <Textarea
                    value={rdbmsSchema}
                    onChange={(e) => setRdbmsSchema(e.target.value)}
                    readOnly
                    style={{
                      height: "250px",
                      fontFamily: "Consolas, monospace",
                      fontSize: "14px",
                      backgroundColor: "#f4f4f4",
                      color: "#333",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      padding: "10px",
                      whiteSpace: "pre-wrap",
                      overflowX: "auto"
                    }}
                    placeholder="Generating schema..."
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => {
                setSchemaPreview(false);
                setMigrating(true);
                implementRdbmsSchema();
              }}>
                  Start Data Migration
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isMigrating} onOpenChange={setMigrating}>
          <DialogContent
            className="sm:max-w-[650px]"
            onEscapeKeyDown={(event) => event.preventDefault()}
            onPointerDownOutside={(event) => event.preventDefault()}
            >
            <DialogHeader>
              <DialogTitle>Data Migration</DialogTitle>
            </DialogHeader>

            <div className="py-2">

              <div className="py-1">

                {showSchemaPending && (
                  <div className="flex items-center">
                    <Circle color="gray" />
                    {pendingSchemaMessage.text && (
                      <div className='text-gray-500 text-sm font-semibold ml-2'>
                        {pendingSchemaMessage.text}
                      </div>
                    )}
                  </div>
                )}

                <Spinner color='yellow' size="small" show={showSchemaLoading}>
                  {loadingSchemaMessage.text && <div className={loadingSchemaMessage.success ? "text-yellow-600 text-sm font-semibold ml-2" : "text-yellow-500 text-sm font-semibold ml-2"}>{loadingSchemaMessage.text}</div>}
                </Spinner>
                
                {showSchemaSuccess && (
                  <div className="flex items-center">
                    <CheckIcon color="green" />
                    <div className="text-green-800 text-sm font-semibold ml-2">
                      {successSchemaMessage.text}
                    </div>
                  </div>
                )}

                {showSchemaFailed && (
                  <div className="flex items-center">
                    <XIcon color="red" />
                    <div className="text-red-600 text-sm font-semibold ml-2">
                      {failedSchemaMessage.text}
                    </div>
                  </div>
                )}

              </div>

              <div className="py-1">

                {showEtlPending && (
                  <div className="flex items-center">
                    <Circle color="gray" />
                    <div className="text-gray-500 text-sm font-semibold ml-2">
                      {pendingEtlMessage.text}
                    </div>
                  </div>
                )}

                <Spinner color='yellow' size="small" show={showEtlLoading}>
                  <div className="text-yellow-600 text-sm font-semibold ml-2">{loadingEtlMessage.text}</div>
                </Spinner>

                {showEtlSuccess && (
                  <div className="flex items-center">
                    <CheckIcon color="green" />
                    <div className="text-green-800 text-sm font-semibold ml-2">
                      {successEtlMessage.text}
                    </div>
                  </div>
                )}

                {showEtlFailed && (
                  <div className="flex items-center">
                    <XIcon color="red" />
                    <div className="text-red-600 text-sm font-semibold ml-2">
                      {failedEtlMessage.text}
                    </div>
                  </div>
                )}

              </div>

            </div>

            <DialogFooter>
              <Button onClick={() => setMigrating(false)}>
                  Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}
