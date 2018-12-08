import string

def reducePolymerOnce(currentPoly):
  curString = currentPoly
  i = 1
  while i < len(curString): 
    curChar = curString[i]
    lastChar = curString[i-1]
    if(curChar.islower() and lastChar.isupper()):
        if(ord(curChar)-ord('a') == ord(lastChar)-ord('A')):
#            print('Old String: {0}'.format(curString))
            curString=curString[:i-1] + curString[i+1:]
#            print('New String: {0}'.format(curString))
            i -= 1 
            if( i == 0):
              i=1
    if(curChar.isupper() and lastChar.islower()):
        if(ord(curChar)-ord('A') == ord(lastChar)-ord('a')):
#           print('Old String: {0}'.format(curString))
            curString=curString[:i-1] + curString[i+1:]
#           print('New String: {0}'.format(curString))
            i -= 1 
            if( i == 0):
              i=1
    i += 1
  return curString


original = "dabAcCaCBAcCcaDA"
print(original)
print(original[:5-1] + original[5+1:])
second = reducePolymerOnce(original)
print (second)
print (len(second))

third = reducePolymerOnce(second)
print (third)
print (len(third))

fourth = reducePolymerOnce(third)
print (fourth)
print (len(fourth))

print("Done Testing")

file = open("day5Input.txt", "r")
filePoly = file.read()
filePoly = filePoly.lstrip().rstrip().replace(" ", "")
originalLen = len(filePoly)
print(len(filePoly))
#print(filePoly)
def reduceString(stringToReduce):
  nextPoly = reducePolymerOnce(stringToReduce)
  stepCount = 1
  polyLen = len(filePoly)
  while(len(nextPoly) != polyLen):
    #print(stepCount)
    stepCount+= 1
    polyLen = len(nextPoly)
    nextPoly = reducePolymerOnce(nextPoly)
  #print(stepCount)
  return nextPoly

reduced = reduceString(filePoly)
print('PartA: Poly Len: {0} OriginalLen: {1}'.format(len(reduced), originalLen))

minLen = len(reduced)
print(len(filePoly))
for charVal in string.ascii_lowercase:
  curLetterRemoved = filePoly.replace(charVal,"").replace(charVal.upper(),"")
  reduced = reduceString(curLetterRemoved)
  if len(reduced) < minLen:
    minLen = len(reduced)
print('PartB: minLength: {0} '.format(minLen))
