/*
 * Utils.h
 *
 *  Created on: Feb 12, 2013
 *      Author: atoor
 */

#ifndef UTILS_H_
#define UTILS_H_

#include <string>
#include <vector>

using namespace std;

namespace utils {
vector<string> &split(const string &s, char delim, vector<string> &elems);
vector<string> split(const string &s, char delim);
bool equals(string one, string two);
bool notEquals(char * one, string two);
int stringToInt(char * arg);
double stringToDouble(char * arg);
int stringToInt(string arg);
bool isDirectory(string name);
string convertToFileExtension(string file, string extension);
string getFileExtension(string fileName);
string getFileExtension(char* fileName);
string getFileWithoutExtension(string fileName);
bool matchesFileExtension(string fileName, string fileExtension);
void recursivelySearchDirectoryForFiles(string directoryName, string fileExtension, vector<string> *files);
}

#endif /* UTILS_H_ */
