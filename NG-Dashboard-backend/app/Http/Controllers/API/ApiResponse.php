<?php
/**
 * Created by PhpStorm.
 * User: AHMED
 */

namespace App\Http\Controllers\API;


trait ApiResponse
{
    /**
     * Response API
     *
     * @param array $data
     * @param int $status
     * @param null $message
     * @param array $headers
     * @return \Illuminate\Http\JsonResponse
     */
    public function apiResponse($data = [], $status = true, $message = null, $headers = []) {
        $dataJ['data'] = $data;
        $dataJ['status'] = $status;
        $dataJ['message'] = $message;
        return response()->json($dataJ, 200, $headers);
    }

    /**
     * Error Msg API
     *
     * @param $message
     * @param array $headers
     * @return \Illuminate\Http\JsonResponse
     */
    public function apiError($message, $headers = []) {
        return $this->apiResponse([], false, $message, $headers);
    }

}