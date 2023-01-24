#include <iostream>
#include <fstream>
#include <vector>
#include <map>
#include <stack>
#include <climits>
#include <string.h>
#include <sstream>
#include <queue>

using namespace std;

// strTok is not threadsafe so looked up another split function.
vector<std::string> strSplit(std::string original_string, char deliminator){
        std::stringstream original_stream(original_string);
        std::string segment;
        std::vector<std::string> seglist;

        while(std::getline(original_stream, segment, deliminator))
        {
                seglist.push_back(segment);
        }
        return seglist;
}

enum Direction{
        NORTH,
        EAST,
        SOUTH,
        WEST,
};

static const string EnumStrings[] = { "NORTH","EAST","SOUTH","WEST" };

const string getTextForEnum( int enumVal )
{
  return EnumStrings[enumVal];
}

class Coordinate{
        public:
                int x;
                int y;
};

class Blizzard{
        public:
               Blizzard(int x, int y, Direction dir){
                location.x = x;
                location.y = y;
                mDir = dir;
               }
               void moveOne(int sizeX, int sizeY){
                int maxX=sizeX-2;
                int maxY=sizeY-2;
                switch(mDir){
                        case NORTH:
                                location.y += 1;
                                if(location.y > maxY){
                                        location.y = 1;
                                }
                                break;
                        case SOUTH:
                                location.y -= 1;
                                if(location.y < 1){
                                        location.y = maxY;
                                }
                                break;
                        case EAST:
                                location.x += 1;
                                if(location.x > maxX){
                                        location.x = 1;
                                }
                                break;
                        case WEST:
                                location.x-=1;
                                if(location.x < 1){
                                        location.x = maxX;
                                }
                                break;
                }
               }
               Direction getDirection(){
                return mDir;
               }
               Coordinate getLocation(){
                return location;
               }
               void setLocation(Coordinate newLoc){
                location = newLoc;
               }
        private:
                Coordinate location;
                Direction mDir;
};


class GridElement{
        public:
                GridElement(char locationChar, int xPos, int yPos){
                        bool newBlizzard = false;
                        containsWall = false;
                        visited=-1;
                        Direction blizzardDir;
                        switch(locationChar){
                                case '^':
                                        blizzardDir = NORTH;
                                        newBlizzard = true;
                                        break;
                                case 'v':
                                        blizzardDir = SOUTH;
                                        newBlizzard = true;
                                        break;
                                case '>':
                                        blizzardDir = EAST;
                                        newBlizzard = true;
                                        break;
                                case '<':
                                        blizzardDir = WEST;
                                        newBlizzard = true;
                                        break;
                                case '.':
                                        // empty space;
                                        break;
                                case '#':
                                        containsWall = true;
                                        break;
                        }
                        if(newBlizzard){
                                currentBlizzards.push_back(new Blizzard(xPos,yPos,blizzardDir));
                        }
                }
                char PrintElement(){
                        if(currentBlizzards.size()>1){
                                return ('0' + currentBlizzards.size());
                        }
                        if(currentBlizzards.size()==1){
                                switch(currentBlizzards[0]->getDirection()){
                                        case NORTH:
                                                return '^';
                                        case SOUTH:
                                                return 'v';
                                        case EAST:
                                                return '>';
                                        case WEST:
                                                return '<';
                                }
                        }
                        if(isWall()){
                                return '#';
                        }
                        return '.';
                }

                bool containsBlizzard(){
                        return (currentBlizzards.size()>0);
                }
                
                vector<Blizzard*> getBlizzards(){
                        return currentBlizzards;
                }
                
                bool isWall(){
                        return containsWall;
                }
                
                bool canMoveTo(){
                        return !(containsBlizzard() || isWall());
                }

                bool isAvailable(int moveNum){
                        //cout<<" MoveNum: "<<moveNum<<" Visited "<<visited<<endl;
                        if(moveNum > visited){
                                visited = moveNum;
                                return true;
                        }
                        return false;
                }

                void removeBlizzard(Blizzard* oldStorm){
                        for (std::vector<Blizzard*>::iterator it = currentBlizzards.begin(); it != currentBlizzards.end();)
                        {
                                if (*it == oldStorm)
                                        it = currentBlizzards.erase(it);
                                else
                                        ++it;
                        }
                }
                void addBlizzard(Blizzard* newStorm){
                        currentBlizzards.push_back(newStorm);
                }
        public:
                bool containsWall;
                vector <Blizzard*> currentBlizzards;
                int visited;


};

class Grid{
        public:
                Grid(){
                }
                void invertY(){
                        Blizzard* curStorm;
                        for(int i=0;i<storms.size();i++){
                                curStorm = storms[i];
                                Coordinate origCoordinate=curStorm->getLocation();
                                origCoordinate.y = (grid.size()-1)-origCoordinate.y;
                                curStorm->setLocation(origCoordinate);
                        }
                }
                GridElement* getElement(int X,int Y){
                        return grid[Y][X];
                }

                
                bool canMoveTo(int X,int Y){
                        if(Y>=grid.size() || Y<0){
                                return false;
                        }

                        if(X>=grid[Y].size() || X<0){
                                return false;
                        }
                        return grid[Y][X]->canMoveTo();
                }

                void addRow(string newRow){
                       vector<GridElement* > currentRow;
                       for(int i=0;i<newRow.size();i++){
                        GridElement* curElement = new GridElement(newRow[i],i,grid.size());
                        currentRow.push_back(curElement);
                        if(curElement->containsBlizzard()){
                                storms.push_back(curElement->getBlizzards()[0]);
                        }
                       }
                       grid.insert(grid.begin(),currentRow);// probably more efficient to either reverse the input or the grid, but its a relatively small grid.
                }
                void printGrid(){
                        for(int i=grid.size()-1;i>=0;i--){
                                for(int j=0;j<grid[i].size();j++){
                                        cout<<grid[i][j]->PrintElement();
                                }
                                cout<<endl;
                        }
                }
                void moveStorms(){
                        Blizzard* curStorm;
                        for(int i=0;i<storms.size();i++){
                                curStorm = storms[i];
                                Coordinate prevLocation = curStorm->getLocation();
                                curStorm->moveOne(grid[prevLocation.y].size(),grid.size());
                                Coordinate newLocation = curStorm->getLocation();
                                //cout<<"PrevX: "<<prevLocation.x<<" NewX: "<<newLocation.x<<" PrevY: "<<prevLocation.y<<" NewY: "<<newLocation.y<<" Direction: "<<getTextForEnum(curStorm->getDirection())<<endl;
                                grid[prevLocation.y][prevLocation.x]->removeBlizzard(curStorm);
                                grid[newLocation.y][newLocation.x]->addBlizzard(curStorm);
                        }
                }
                Coordinate size(){
                        Coordinate sizeVal;
                        sizeVal.y = grid.size();
                        sizeVal.x = grid[sizeVal.y-1].size();
                        return sizeVal;
                }
                Coordinate getStart(){
                        Coordinate sizeVal;
                        sizeVal.y = grid.size()-1;
                        sizeVal.x = -1;
                        for(int x=0;x<grid[sizeVal.y-1].size();x++){
                                if(!grid[sizeVal.y][x]->isWall()){
                                        sizeVal.x = x;
                                        return sizeVal;
                                }
                        }
                        return sizeVal;
                }
                Coordinate getEnd(){
                        Coordinate sizeVal;
                        sizeVal.y = 0;
                        sizeVal.x = -1;
                        for(int x=0;x<grid[sizeVal.y].size();x++){
                                if(!grid[sizeVal.y][x]->isWall()){
                                        sizeVal.x = x;
                                        return sizeVal;
                                }
                        }
                        return sizeVal;
                }
        private:
                vector<vector<GridElement*>> grid;
                vector<Blizzard*> storms;
};

class Expedition{
        public:
                Expedition(Coordinate start){
                        curLoc = start;
                        moves = 0;
                }
                Expedition(int x, int y, int moveNumber){
                       curLoc.x = x;
                       curLoc.y = y;
                       moves = moveNumber; 
                }
                int findNextMoves(Grid &newSnowGrid, queue<Expedition> &locationToSearch, bool south){
                        checkAndAddLocation(newSnowGrid, locationToSearch, curLoc.x,curLoc.y,moves);
                        checkAndAddLocation(newSnowGrid, locationToSearch, curLoc.x+1,curLoc.y,moves);
                        checkAndAddLocation(newSnowGrid, locationToSearch, curLoc.x-1,curLoc.y,moves);
                        if(checkAndAddLocation(newSnowGrid, locationToSearch, curLoc.x,curLoc.y+1,moves)){
                                if(!south && ((curLoc.y+1) == (newSnowGrid.size().y-1))){
                                        return moves;
                                }
                        }
                        if(checkAndAddLocation(newSnowGrid, locationToSearch, curLoc.x,curLoc.y-1,moves)){
                                if(south && (curLoc.y-1) == 0){
                                        return moves;
                                }
                        }
                        return -1;
                }
                int getCurrentMoves(){
                        return moves;
                }
                bool isAvailable(Grid &snowGrid){
                        //cout<<"Checking X: "<<curLoc.x<<" Y: "<<curLoc.y;
                        return snowGrid.getElement(curLoc.x,curLoc.y)->isAvailable(moves);
                }
                bool checkAndAddLocation(Grid &newSnowGrid, queue<Expedition> &locationToSearch, int X, int Y,int moves){
                        if(newSnowGrid.canMoveTo(X,Y)){
                                locationToSearch.push(Expedition(X, Y, moves+1));
                                return true;
                        }
                        return false;
                }
                Coordinate getCurrentLocation(){
                        return curLoc;
                }
        private:
                Coordinate curLoc;
                int moves;
};

int day24a(Grid &stormGrid) {
        Coordinate start = stormGrid.getStart();
        cout<<"Start X: "<<start.x<<" Y: "<<start.y<<endl;
        queue<Expedition> locationToCheck;
        locationToCheck.push(Expedition(start));
        int lastStatus=-1;
        int currentMoves=0;
        while(lastStatus==-1 && locationToCheck.size()>0){
                Expedition curState = locationToCheck.front();
                locationToCheck.pop();
                if(curState.isAvailable(stormGrid)){
                        if(currentMoves!=curState.getCurrentMoves()){
                                cout<<"Current Moves: "<<currentMoves<<" Size: "<<locationToCheck.size()<<endl;
                                stormGrid.moveStorms();
                                currentMoves=curState.getCurrentMoves();
                        }
                        lastStatus=curState.findNextMoves(stormGrid,locationToCheck, true);
                }
        }
        return lastStatus;
        // stormGrid.printGrid();
        // cout<<"Second Spot"<<endl;
        // stormGrid.moveStorms();
        // stormGrid.printGrid();
        // cout<<"third Spot"<<endl;
        // stormGrid.moveStorms();
        // stormGrid.printGrid();
}

long long int day24b(Grid &stormGrid, int preMove) {
        Coordinate start = stormGrid.getStart();
        cout<<"Start X: "<<start.x<<" Y: "<<start.y<<endl;
        Coordinate end = stormGrid.getEnd();
        cout<<"End X: "<<end.x<<" Y: "<<end.y<<endl;
        queue<Expedition> locationToCheck;
        locationToCheck.push(Expedition(end.x,end.y,preMove+1));
        int lastStatus=-1;
        int currentMoves=preMove+1;
        stormGrid.moveStorms(); // move storm between directions...
        while(lastStatus==-1 && locationToCheck.size()>0){
                Expedition curState = locationToCheck.front();
                locationToCheck.pop();
                if(curState.isAvailable(stormGrid)){
                        if(currentMoves!=curState.getCurrentMoves()){
                                cout<<"Current Moves: "<<currentMoves<<" Size: "<<locationToCheck.size()<<endl;
                                stormGrid.moveStorms();
                                currentMoves=curState.getCurrentMoves();
                        }
                        lastStatus=curState.findNextMoves(stormGrid,locationToCheck, false);
                        if(lastStatus!=-1){
                                cout<<"Cur State X: "<<curState.getCurrentLocation().x<<" Y: "<<curState.getCurrentLocation().y<<endl;
                        }
                }
        }

        int upwardMoves = lastStatus+1;
        queue<Expedition> locationToCheckDown;
        locationToCheckDown.push(Expedition(start.x,start.y,upwardMoves));
        currentMoves=upwardMoves;
        lastStatus=-1;
        stormGrid.moveStorms(); // move storm between directions...
        while(lastStatus==-1 && locationToCheckDown.size()>0){
                Expedition curState = locationToCheckDown.front();
                locationToCheckDown.pop();
                if(curState.isAvailable(stormGrid)){
                        if(currentMoves!=curState.getCurrentMoves()){
                                cout<<"Current Moves: "<<currentMoves<<" Size: "<<locationToCheckDown.size()<<endl;
                                stormGrid.moveStorms();
                                currentMoves=curState.getCurrentMoves();
                        }
                        lastStatus=curState.findNextMoves(stormGrid,locationToCheckDown, true);
                        if(lastStatus!=-1){
                                cout<<"Cur State X: "<<curState.getCurrentLocation().x<<" Y: "<<curState.getCurrentLocation().y<<endl;
                        }
                }
        }
        return lastStatus;
}

int main(){
        cout<<"Hello day 24"<<endl;
        ifstream inFile("day24.txt");
        Grid testStormGrid;
        Grid stormGrid;
        string line;
        
        while(std::getline(inFile,line)) 
        {
                stormGrid.addRow(line);
        }
        stormGrid.invertY(); //I'm reading it in backwards from how I want them stored, so need to invert the numbers...

        ifstream testFile("day24_test.txt");
        while(std::getline(testFile, line)) 
        {
                testStormGrid.addRow(line);
        }
        testStormGrid.invertY(); //I'm reading it in backwards from how I want them stored, so need to invert the numbers...
        //cout<<"Patern :"<<testJetPattern.toString()<<endl;
        int testPartA = day24a(testStormGrid);
        int partA = day24a(stormGrid);

        int testPartB = day24b(testStormGrid, testPartA);
        int partB = day24b(stormGrid, partA);
        cout<<"Test Result: "<<testPartA<<endl;
        cout<<"PartA Result: "<<partA<<endl;
        cout<<"Test Part B Result: "<<testPartB<<endl;
        cout<<"PartB Result: "<<partB<<endl;
        cout<<"After Close: "<<endl;
        return 0;
}



