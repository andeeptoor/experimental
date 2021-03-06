/*
 * Utils.cpp
 *
 *  Created on: Feb 12, 2013
 *      Author: atoor
 */
#include "utils.h"
#include <iostream>
#include <sys/types.h>
#include <dirent.h>
#include <stdlib.h>
#include <list>
#include <vector>
#include <iostream>
#include <sstream>
#include <string>
#include <cstring>

using namespace std;

namespace utils {

vector<string> &split(const string &s, char delim, vector<string> &elems) {
	stringstream ss(s);
	string item;
	while (std::getline(ss, item, delim)) {
		elems.push_back(item);
	}
	return elems;
}

vector<string> split(const string &s, char delim) {
	vector<string> elems;
	split(s, delim, elems);
	return elems;
}

bool notEquals(char * one, string two) {
	return strcmp(one, two.c_str());
}

bool equals(string one, string two) {
	return !strcmp(one.c_str(), two.c_str());
}

int stringToInt(string arg) {
	return stringToInt((char *) arg.c_str());
}

int stringToInt(char * arg) {
	stringstream stream1;
	stream1.str(arg);
	int stringToInt;
	stream1 >> stringToInt;
	return stringToInt;
}

double stringToDouble(char * arg) {
	stringstream stream1;
	stream1.str(arg);
	double stringToDouble;
	stream1 >> stringToDouble;
	return stringToDouble;
}

//File operations
bool isDirectory(string name) {
	return opendir(name.c_str()) != NULL;
}

string getFileExtension(char* fileName) {
	stringstream stream1;
	stream1.str(fileName);
	return getFileExtension(stream1.str());
}

string getFileExtension(string fileName) {
	std::string::size_type indexOfDot;
	indexOfDot = fileName.rfind('.');
	if (indexOfDot != std::string::npos) {
		string actualFileExtension = fileName.substr(indexOfDot + 1);
		return actualFileExtension;
	}
	return "";
}

string getFileWithoutExtension(string fileName) {
	std::string::size_type indexOfDot;
	indexOfDot = fileName.rfind('.');
	if (indexOfDot != std::string::npos) {
		string actualFileWithoutExtension = fileName.substr(0, indexOfDot);
		return actualFileWithoutExtension;
	}
	return "";
}

string convertToFileExtension(string file, string extension) {
	string fileWithoutExtension = utils::getFileWithoutExtension(file);
	stringstream stream1;
	stream1 << fileWithoutExtension << "." << extension;
	string convertedFileName = stream1.str();
	return convertedFileName;
}

bool matchesFileExtension(string fileName, string fileExtension) {
	std::string::size_type indexOfDot;
	indexOfDot = fileName.rfind('.');
	if (indexOfDot != std::string::npos) {
		string actualFileExtension = fileName.substr(indexOfDot + 1);
		return !strcmp(actualFileExtension.c_str(), fileExtension.c_str());
	} else {
		return false;
	}
}

void recursivelySearchDirectoryForFiles(string directoryName, string fileExtension, vector<string> *files) {
	struct dirent *ep;

	DIR *directory = opendir(directoryName.c_str());
	char * fileName;
	if (directory != NULL) {
		while ((ep = readdir(directory))) {
			if (utils::notEquals(ep->d_name, ".") && utils::notEquals(ep->d_name, "..")) {
				stringstream fileNameStream;
				fileNameStream << directoryName << "/" << ep->d_name;
				string fileName = fileNameStream.str();
//				cout << "Found potential match: " << fileName << endl;
				if (utils::isDirectory(fileName)) {
					recursivelySearchDirectoryForFiles(fileName, fileExtension, files);
				} else {
					if (utils::matchesFileExtension(fileName, fileExtension)) {
						files->push_back(fileName);
					} else {
					}
				}
			}
		}
		closedir(directory);
	} else {
		cout << "Could not find directory: " << directoryName << endl;
	}
}

}

