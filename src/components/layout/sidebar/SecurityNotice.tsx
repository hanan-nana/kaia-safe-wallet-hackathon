import { AlertTriangle, AlertCircle } from "lucide-react";

interface SecurityNoticeProps {
  onConnect: () => void;
}

const SecurityNotice = ({ onConnect }: SecurityNoticeProps) => {
  return (
    <div className="mb-6">
      <div
        className="bg-glass-dark-secondary rounded-xl p-4 cursor-pointer hover:bg-glass-dark transition-colors"
        onClick={onConnect}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-green-gray-900 mb-1">
              보안 알림
            </h4>
            <p className="text-xs text-green-gray-600 leading-relaxed mb-2">
              해킹 접근이나 보안상 위험한 접근 확인 시 연락받을 라인 ID를
              입력해주세요.
            </p>

            {/* 하단 경고 버튼 - 텍스트 바로 아래에 위치 */}
            <div className="flex items-center gap-2 text-xs text-amber-600">
              <AlertCircle className="w-3 h-3" />
              <span>클릭해서 라인 ID 입력하기</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityNotice;
