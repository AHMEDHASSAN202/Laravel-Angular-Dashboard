<?php
/**
 * Created by PhpStorm.
 * User: AHMED
 */

namespace App\Http\Controllers\API;


use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use GuzzleHttp\Client;

class LoginController extends Controller
{
    use ApiResponse;

    /**
     * LoginController constructor.
     *
     */
    public function __construct()
    {
        $this->middleware('auth:api')->only(['logout']);
        $this->middleware('guest')->only(['login']);
    }

    /**
     * Login Page
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'     => 'required|email|exists:users,email',
            'password'  => 'required'
        ]);
        if ($validator->fails()) {
            return $this->apiResponse([], false, 'The given data was invalid.');
        }
        if ($user = User::where(['email' => $request->email, 'active' => true])->first()) {
            if (Hash::check($request->password, $user->password)) {
                $data = [
                    'profile'  => new UserResource($user),
                    'token'    => $user->createToken('login')->accessToken
                ];
                return $this->apiResponse($data, true, 'successful login');
            }
        }
        return $this->apiResponse([], false, 'The given data was invalid.');
    }


    /**
     * Logout Function by API
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::user()->deleteTokens();
        return $this->apiResponse([], true, 'successful logout');
    }

}