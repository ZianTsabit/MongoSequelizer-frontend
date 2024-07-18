import Image from "next/image";

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
  return (

    <section className="w-full">

      <div className="h-screen flex items-center justify-center">
        <Tabs defaultValue="MongoDB" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="MongoDB">MongoDB</TabsTrigger>
            <TabsTrigger value="PostgreSQL">PostgreSQL</TabsTrigger>
            <TabsTrigger value="Evaluate">Evaluate</TabsTrigger>
          </TabsList>
        
          <TabsContent value="MongoDB">
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
                    <Input id="uri" placeholder="mongodb://localhost:27017" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="mongo-database">DB</Label>
                    <Input id="mongo-database" placeholder="my-db" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save & Test Connection</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          <TabsContent value="PostgreSQL">
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
                  <Input id="host" placeholder="localhost" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="port">Port</Label>
                  <Input id="port" placeholder="5432" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="postgre-database">DB</Label>
                  <Input id="postgre-database" placeholder="my-db" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="postgre-user">Username</Label>
                  <Input id="postgre-user" placeholder="admin" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="postgre-password">Password</Label>
                  <Input id="postgre-password" type="password" placeholder="******" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save & Test Connection</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="Evaluate">
            <Card>
              <CardHeader>
                <CardTitle>Evaluate</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Start Transformation</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
   
  );
}
