#!/usr/bin/env python3
"""
Comprehensive Backend API Testing Suite for Portfolio Application
Tests all endpoints for functionality, data validation, and error handling
"""

import requests
import json
import os
import sys
from typing import Dict, Any, List
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    """Get the backend URL from frontend .env file"""
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None
    return None

class PortfolioAPITester:
    def __init__(self):
        self.base_url = get_backend_url()
        if not self.base_url:
            raise Exception("Could not get backend URL from frontend/.env")
        
        self.api_url = f"{self.base_url}/api"
        self.test_results = []
        self.total_tests = 0
        self.passed_tests = 0
        
        print(f"Testing Portfolio API at: {self.api_url}")
        print("=" * 60)
    
    def log_test(self, test_name: str, passed: bool, details: str = ""):
        """Log test result"""
        self.total_tests += 1
        if passed:
            self.passed_tests += 1
            status = "✅ PASS"
        else:
            status = "❌ FAIL"
        
        result = {
            "test": test_name,
            "passed": passed,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        print(f"{status} - {test_name}")
        if details:
            print(f"    Details: {details}")
    
    def test_health_check(self):
        """Test GET /api/ endpoint for basic connectivity"""
        print("\n1. Testing Health Check Endpoint")
        print("-" * 40)
        
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "status" in data:
                    self.log_test("Health Check", True, f"Status: {data.get('status')}, Message: {data.get('message')}")
                else:
                    self.log_test("Health Check", False, "Missing required fields in response")
            else:
                self.log_test("Health Check", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")
    
    def test_projects_api(self):
        """Test GET /api/projects and GET /api/projects/featured endpoints"""
        print("\n2. Testing Projects API")
        print("-" * 40)
        
        # Test all projects endpoint
        try:
            response = requests.get(f"{self.api_url}/projects", timeout=10)
            
            if response.status_code == 200:
                projects = response.json()
                if isinstance(projects, list) and len(projects) > 0:
                    # Validate project structure
                    project = projects[0]
                    required_fields = ['id', 'title', 'description', 'image', 'technologies', 'category', 'featured']
                    optional_fields = ['demo_url', 'github_url', 'created_at', 'updated_at']
                    
                    missing_fields = [field for field in required_fields if field not in project]
                    if not missing_fields:
                        self.log_test("Get All Projects", True, f"Retrieved {len(projects)} projects with correct structure")
                    else:
                        self.log_test("Get All Projects", False, f"Missing required fields: {missing_fields}")
                else:
                    self.log_test("Get All Projects", False, "No projects returned or invalid format")
            else:
                self.log_test("Get All Projects", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Get All Projects", False, f"Connection error: {str(e)}")
        
        # Test featured projects endpoint
        try:
            response = requests.get(f"{self.api_url}/projects/featured", timeout=10)
            
            if response.status_code == 200:
                featured_projects = response.json()
                if isinstance(featured_projects, list):
                    # Check if all returned projects are featured
                    all_featured = all(project.get('featured', False) for project in featured_projects)
                    if all_featured:
                        self.log_test("Get Featured Projects", True, f"Retrieved {len(featured_projects)} featured projects")
                    else:
                        self.log_test("Get Featured Projects", False, "Some returned projects are not marked as featured")
                else:
                    self.log_test("Get Featured Projects", False, "Invalid response format")
            else:
                self.log_test("Get Featured Projects", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Get Featured Projects", False, f"Connection error: {str(e)}")
    
    def test_skills_api(self):
        """Test GET /api/skills endpoint with proper category grouping"""
        print("\n3. Testing Skills API")
        print("-" * 40)
        
        try:
            response = requests.get(f"{self.api_url}/skills", timeout=10)
            
            if response.status_code == 200:
                skills_data = response.json()
                expected_categories = ['frontend', 'backend', 'design', 'tools']
                
                # Check if all categories are present
                missing_categories = [cat for cat in expected_categories if cat not in skills_data]
                if not missing_categories:
                    # Validate skill structure
                    total_skills = 0
                    valid_structure = True
                    
                    for category, skills in skills_data.items():
                        if isinstance(skills, list):
                            total_skills += len(skills)
                            for skill in skills:
                                required_skill_fields = ['id', 'name', 'level', 'years', 'category']
                                if not all(field in skill for field in required_skill_fields):
                                    valid_structure = False
                                    break
                        else:
                            valid_structure = False
                            break
                    
                    if valid_structure:
                        self.log_test("Get Skills", True, f"Retrieved {total_skills} skills grouped in {len(expected_categories)} categories")
                    else:
                        self.log_test("Get Skills", False, "Invalid skill structure")
                else:
                    self.log_test("Get Skills", False, f"Missing categories: {missing_categories}")
            else:
                self.log_test("Get Skills", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Get Skills", False, f"Connection error: {str(e)}")
    
    def test_contact_info_api(self):
        """Test GET /api/contact-info endpoint"""
        print("\n4. Testing Contact Info API")
        print("-" * 40)
        
        try:
            response = requests.get(f"{self.api_url}/contact-info", timeout=10)
            
            if response.status_code == 200:
                contact_info = response.json()
                required_fields = ['email']
                optional_fields = ['phone', 'location', 'availability', 'response_time']
                
                # Check required fields
                missing_required = [field for field in required_fields if field not in contact_info]
                if not missing_required:
                    # Validate email format (basic check)
                    email = contact_info.get('email', '')
                    if '@' in email and '.' in email:
                        self.log_test("Get Contact Info", True, f"Contact info retrieved with email: {email}")
                    else:
                        self.log_test("Get Contact Info", False, "Invalid email format")
                else:
                    self.log_test("Get Contact Info", False, f"Missing required fields: {missing_required}")
            else:
                self.log_test("Get Contact Info", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Get Contact Info", False, f"Connection error: {str(e)}")
    
    def test_contact_submission(self):
        """Test POST /api/contact with form data submission"""
        print("\n5. Testing Contact Submission")
        print("-" * 40)
        
        # Test valid contact submission
        valid_contact_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "subject": "Portfolio Inquiry",
            "message": "I'm interested in discussing a potential project collaboration. Your portfolio showcases impressive work!"
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact",
                json=valid_contact_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                result = response.json()
                if result.get('success') and 'message' in result:
                    self.log_test("Contact Submission (Valid)", True, f"Success: {result.get('message')}")
                else:
                    self.log_test("Contact Submission (Valid)", False, "Invalid response structure")
            else:
                self.log_test("Contact Submission (Valid)", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Submission (Valid)", False, f"Connection error: {str(e)}")
        
        # Test invalid contact submission (missing required fields)
        invalid_contact_data = {
            "name": "Jane Doe",
            "email": "invalid-email"
            # Missing subject and message
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact",
                json=invalid_contact_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 422:  # Validation error expected
                self.log_test("Contact Submission (Invalid)", True, "Properly rejected invalid data with 422 status")
            elif response.status_code == 400:  # Bad request also acceptable
                self.log_test("Contact Submission (Invalid)", True, "Properly rejected invalid data with 400 status")
            else:
                self.log_test("Contact Submission (Invalid)", False, f"Expected validation error, got HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Submission (Invalid)", False, f"Connection error: {str(e)}")
    
    def test_data_validation(self):
        """Test data validation and field requirements"""
        print("\n6. Testing Data Validation")
        print("-" * 40)
        
        # Test contact form with empty fields
        empty_contact = {
            "name": "",
            "email": "",
            "subject": "",
            "message": ""
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact",
                json=empty_contact,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code in [400, 422]:
                self.log_test("Data Validation (Empty Fields)", True, "Properly rejected empty fields")
            else:
                self.log_test("Data Validation (Empty Fields)", False, f"Should reject empty fields, got HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Data Validation (Empty Fields)", False, f"Connection error: {str(e)}")
        
        # Test contact form with invalid email
        invalid_email_contact = {
            "name": "Test User",
            "email": "not-an-email",
            "subject": "Test Subject",
            "message": "Test message content"
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact",
                json=invalid_email_contact,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code in [400, 422]:
                self.log_test("Data Validation (Invalid Email)", True, "Properly rejected invalid email format")
            else:
                self.log_test("Data Validation (Invalid Email)", False, f"Should reject invalid email, got HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Data Validation (Invalid Email)", False, f"Connection error: {str(e)}")
    
    def test_error_handling(self):
        """Test error responses for invalid requests"""
        print("\n7. Testing Error Handling")
        print("-" * 40)
        
        # Test non-existent endpoint
        try:
            response = requests.get(f"{self.api_url}/nonexistent", timeout=10)
            
            if response.status_code == 404:
                self.log_test("Error Handling (404)", True, "Properly returns 404 for non-existent endpoint")
            else:
                self.log_test("Error Handling (404)", False, f"Expected 404, got HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Error Handling (404)", False, f"Connection error: {str(e)}")
        
        # Test malformed JSON in POST request
        try:
            response = requests.post(
                f"{self.api_url}/contact",
                data="invalid json data",
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code in [400, 422]:
                self.log_test("Error Handling (Malformed JSON)", True, "Properly handles malformed JSON")
            else:
                self.log_test("Error Handling (Malformed JSON)", False, f"Should reject malformed JSON, got HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Error Handling (Malformed JSON)", False, f"Connection error: {str(e)}")
    
    def test_database_integration(self):
        """Test database integration and data persistence"""
        print("\n8. Testing Database Integration")
        print("-" * 40)
        
        # Test that contact submissions are saved (by checking admin endpoint)
        try:
            response = requests.get(f"{self.api_url}/contacts", timeout=10)
            
            if response.status_code == 200:
                contacts = response.json()
                if isinstance(contacts, list):
                    self.log_test("Database Integration (Contacts)", True, f"Retrieved {len(contacts)} contact submissions from database")
                else:
                    self.log_test("Database Integration (Contacts)", False, "Invalid contacts data format")
            else:
                self.log_test("Database Integration (Contacts)", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Database Integration (Contacts)", False, f"Connection error: {str(e)}")
        
        # Verify seeded data exists
        try:
            # Check projects count
            projects_response = requests.get(f"{self.api_url}/projects", timeout=10)
            skills_response = requests.get(f"{self.api_url}/skills", timeout=10)
            
            projects_count = len(projects_response.json()) if projects_response.status_code == 200 else 0
            
            skills_count = 0
            if skills_response.status_code == 200:
                skills_data = skills_response.json()
                skills_count = sum(len(skills) for skills in skills_data.values())
            
            if projects_count > 0 and skills_count > 0:
                self.log_test("Database Integration (Seeded Data)", True, f"Found {projects_count} projects and {skills_count} skills")
            else:
                self.log_test("Database Integration (Seeded Data)", False, "Missing seeded data")
                
        except Exception as e:
            self.log_test("Database Integration (Seeded Data)", False, f"Error checking seeded data: {str(e)}")
    
    def run_all_tests(self):
        """Run all test suites"""
        print(f"Starting Portfolio Backend API Tests")
        print(f"Backend URL: {self.api_url}")
        print("=" * 60)
        
        # Run all test suites
        self.test_health_check()
        self.test_projects_api()
        self.test_skills_api()
        self.test_contact_info_api()
        self.test_contact_submission()
        self.test_data_validation()
        self.test_error_handling()
        self.test_database_integration()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.total_tests}")
        print(f"Passed: {self.passed_tests}")
        print(f"Failed: {self.total_tests - self.passed_tests}")
        print(f"Success Rate: {(self.passed_tests/self.total_tests)*100:.1f}%")
        
        # Print failed tests
        failed_tests = [test for test in self.test_results if not test['passed']]
        if failed_tests:
            print("\nFAILED TESTS:")
            print("-" * 40)
            for test in failed_tests:
                print(f"❌ {test['test']}: {test['details']}")
        
        print("\n" + "=" * 60)
        
        # Return success status
        return self.passed_tests == self.total_tests

def main():
    """Main test execution"""
    try:
        tester = PortfolioAPITester()
        success = tester.run_all_tests()
        
        # Exit with appropriate code
        sys.exit(0 if success else 1)
        
    except Exception as e:
        print(f"Error running tests: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()